import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, LoadingController, ModalController, NavController } from '@ionic/angular';
import { EventsService } from '../events.service';
import { Storage } from '@ionic/storage';
import { ProfileService } from '../../profile/profile.service';
import { b2bChatDirectModel } from 'src/app/models/b2b-chat-direct-model';
import {  interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-details-event',
  templateUrl: './modal-details-event.page.html',
  styleUrls: ['./modal-details-event.page.scss'],
})
export class ModalDetailsEventPage implements OnInit {

  idUserFromStorage;

  chatMessageDetail: b2bChatDirectModel[];
  lstChatMessage = [];
  enable = true;

  newMsg;
  newMessageDirectModel = new b2bChatDirectModel();
 // currentUser = 'simon';

  //init page read
  pageEvent = 1;

  //subscriber
  private subscriptions: Subscription[] = [];
  subListerMessages;

  //testing

  @Input() userDestinyId;
  @Input() userDestinyName; 
  @Input() userDestinyNameLastName
  @Input() userDestinyPhotoProfileUser ;
  @ViewChild(IonContent) content: IonContent;
  constructor(private modalCrtl: ModalController,
              private profileService: ProfileService,
              private eventService: EventsService,
              private storage: Storage,
              private navCtrl: NavController,
              public alertController: AlertController,
              public loadingController: LoadingController) { }
    
  ngOnInit() {

    console.log("this is the user destiny message " + this.userDestinyId);
    console.log("this is the user destiny message " + this.userDestinyName);
    console.log("this is the user destiny message " + this.userDestinyNameLastName);
    console.log("this is the user destiny message " + this.userDestinyPhotoProfileUser);
    this.getUserIdFromStorage();
    this.presentLoading();
  
   // this.nextEvents();

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ngOnDestroy(){
    this.subListerMessages.unsubscribe();
  }
  //subscription listener messages
  getListenerMessages(){
    this.nextEvents();
    this.subListerMessages.unsubscribe();
  }

  interval = interval(1000)

  nextEvents(event?, pull: boolean = false){

    console.log("algays need the idUserOrigin and idUserDestiny");
    console.log(this.idUserFromStorage);
    console.log(this.userDestinyId);

    //this.pageEvent ++;
    this.subListerMessages = this.interval.subscribe(()=>{
      this.eventService.getChatMessagesDirect(pull, this.idUserFromStorage, this.userDestinyId, this.pageEvent)
      .subscribe((data: b2bChatDirectModel[])=>{
        console.log(data);
        console.log("this is chat message details");
        this.chatMessageDetail = data;
        console.log(this.chatMessageDetail);
   /*      if(this.chatMessageDetail != null){
          for(let i = 0; i < this.chatMessageDetail.length; i++){
            var obj = this.chatMessageDetail[i];
        //    this.lstChatMessage.push(obj);
            console.log("this list the chat")
            console.log(this.lstChatMessage);
            console.log("this is the object");
            console.log(obj);
         }
        } */
  /*       if(event){
          event.target.complete();
          if(this.chatMessageDetail == null){
            this.enable = false
          }
        } */
      });
    })
  }

  date: Date;
  sendMessages(){

    let date: Date = new Date();  

    console.log("this newMsg " + this.newMsg);
    console.log(this.newMsg);

    console.log(this.newMessageDirectModel.messageContent);

    this.newMessageDirectModel.idUserDestiny = this.userDestinyId;
    this.newMessageDirectModel.idUserOrigin = this.userOriginId;
    this.newMessageDirectModel.createAt = date.toDateString(); 
    this.newMessageDirectModel.messageContent = this.newMsg;

    console.log(this.newMessageDirectModel);

    this.eventService.postNewMessageDirect(this.newMessageDirectModel)
    .subscribe(data=>{
      console.log(data);
    //  this.lstChatMessage.push(this.newMessageDirectModel);
   //   console.log(this.newMessageDirectModel);
   //   console.log("clear model after to send ");
      this.newMessageDirectModel = new b2bChatDirectModel();
      console.log(this.newMessageDirectModel);
      this.newMsg = '';
      this.nextEvents();
      setTimeout(()=>{
        this.content.scrollToBottom(200);
      });
  
      
    },
    error =>{
     this.presentAlert("User and Password Incorrect, please try again");
    });

/*     this.eventService.postNewMessageDirect(msg)
    .subscribe(data=>{
      console.log(data);
    })
 */
   /*  this.messages.push({
      user:'simon',
      createdAt: new Date().getTime(),
      
      msg:this.newMsg
    });

    console.log(this.newMsg);

    this.newMsg = '';
    setTimeout(()=>{
      this.content.scrollToBottom(200);
    }); */
    
  }



  async presentAlert(message:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
 

  getUserIdFromStorage(){
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
       this.idUserFromStorage = val;
       this.getUserOriginInfo(val);
       console.log("inside to from storage");
       this.nextEvents();
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  userOriginId: string;
  userEmail:       string;
  userPass:       string;
  userTlf:       string;
  userName:       string;
  userLastName:       string;
  photoProfileUser:       string;
  createAt:       string;
  userAbout:       string;

  getUserOriginInfo(userId){
    this.profileService.getUserProfileDetails(userId)
    .subscribe((data)=>{

      this.userOriginId = userId;
      this.userEmail = data[0].userEmail;
      this.userPass = data[0].userPass;
      this.userTlf = data[0].userTlf;
      this.userName = data[0].userName;
      this.userLastName = data[0].userLastName;
      this.photoProfileUser = data[0].photoProfileUser;
      this.userAbout = data[0].userAbout;

      console.log(this.userName);
      console.log(this.userLastName);
      console.log(this.photoProfileUser);
    
  });
  }
  
}
