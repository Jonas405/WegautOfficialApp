import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavController } from '@ionic/angular';
import { EventSheduleDetails } from 'src/app/interfaces/event';
import { ScheduleUserEvent } from 'src/app/models/schedule-user-event-models';
import { EventsService } from '../events.service';
import { Storage } from '@ionic/storage';
import { NotificationService } from '../../notification/notification.service';
import { NotificationModel } from 'src/app/models/notification-model';
import { ModalDetailsEventPage } from '../modal-details-event/modal-details-event.page';
import { interval, Subscription } from 'rxjs';
import { b2bChatDirectModel } from 'src/app/models/b2b-chat-direct-model';

@Component({
  selector: 'app-modal-schedule-event',
  templateUrl: './modal-schedule-event.page.html',
  styleUrls: ['./modal-schedule-event.page.scss'],
})
export class ModalScheduleEventPage implements OnInit {

  idUserFromStorage;
  chatMessageDetail: b2bChatDirectModel[];
  lstChatMessage = [];
  enable = true;
  newMsg;
  newMessageDirectModel = new b2bChatDirectModel();

  //init page read
  pageEvent = 1;

  //subscriber
  private subscriptions: Subscription[] = [];
  subListerMessages;
  
  @Input() chatRoomId;
  @Input() nameRoom;
  @ViewChild(IonContent) content: IonContent;
  loadingController: any;
  alertController: any;
  constructor(private modalCtrl: ModalController,
              private eventService: EventsService,
              private storage: Storage,
              private navCtrl: NavController,
              private notificationService: NotificationService) { }

  ngOnInit() { 
    this.presentLoading();
    this.getUserIdFromStorage();

   
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
                console.log(this.chatRoomId);
            
                //this.pageEvent ++;
                this.subListerMessages = this.interval.subscribe(()=>{
                  this.eventService.getChatMessagesDirectGroup(pull, this.idUserFromStorage, this.chatRoomId, this.pageEvent)
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
            
  closeScheduleModal(){
    this.ngOnDestroy();
    this.subListerMessages.unsubscribe();
      this.modalCtrl.dismiss();
  }

  date: Date;
  sendMessages(){

    let date: Date = new Date();  

    console.log("this newMsg " + this.newMsg);
    console.log(this.newMsg);

    console.log(this.newMessageDirectModel.messageContent);

    this.newMessageDirectModel.idGroupDestiny = this.chatRoomId;
    this.newMessageDirectModel.idUserOrigin = this.idUserFromStorage;
    this.newMessageDirectModel.createAt = date.toDateString(); 
    this.newMessageDirectModel.messageContent = this.newMsg;
    console.log(this.newMessageDirectModel);

    this.eventService.postNewMessageGroup(this.newMessageDirectModel)
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
       console.log("inside to from storage");
       this.nextEvents();
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

}
