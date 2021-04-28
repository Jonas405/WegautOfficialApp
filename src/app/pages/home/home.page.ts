import { Component} from '@angular/core';
import { EventsService } from '../events/events.service';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { EventSheduleDetails } from 'src/app/interfaces/event';
import { CountdownComponent } from 'ngx-countdown';
import { HomeService } from './home.service';
import { ModalFollowUsersPage } from './modal-follow-users/modal-follow-users.page';
import { ModalDetailsEventPage } from '../events/modal-details-event/modal-details-event.page';
import { NotificationService } from '../notification/notification.service';
import { ProfileService } from '../profile/profile.service';
import { b2bUserModel } from 'src/app/models/b2b-user-model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  eventSheduleDetails : EventSheduleDetails[];
  //demo: any;
  userStorageId: string;
  userProfileContacts: b2bUserModel[];
  
  constructor(private eventService: EventsService,
              private notificationService: NotificationService,
              private profileService: ProfileService,
              private storage: Storage,
              private navCtrl: NavController,
              private modalCrtl: ModalController,
              private homeService: HomeService) {}



  ngOnInit() {
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is ', val);
        this.userStorageId = val;
        this.getUserProfileContacts(val);
      //  this.getNotifications(val);
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  getUserProfileContacts(userId){
    this.profileService.getUserContacts(userId)
    .subscribe((data)=>{
      this.userProfileContacts = data;
      console.log(data);
    })
  }
  

  getEventShedule(userId){
    this.eventService.getScheduleUserEvent(userId).subscribe((data: EventSheduleDetails[])=>{
      this.eventSheduleDetails = data;
      console.log(this.eventSheduleDetails);
    })
  }


   startCountDownDate(eventDate?){

    let newDate = new Date(eventDate);
    let myDate: any;
    myDate = newDate;
    let demo: any;

       let now = new Date().getTime();
       let distance = myDate - now;
        // Time calculations for days, hours, minutes and seconds
       let days = Math.floor(distance / (1000 * 60 * 60 * 24));
       let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
       let seconds = Math.floor((distance % (1000 * 60)) / 1000);
       demo = days +" days";
       return demo;
    
    //  console.log("valor abajo");
   } 

   async getDetailsEvent(userDestinyId, userDestinyName, userDestinyNameLastName, userDestinyPhotoProfileUser){

    console.log("this is the view details"+userDestinyId);
    
    const modal = await this.modalCrtl.create({
      component: ModalDetailsEventPage,
      componentProps:{
       'userDestinyId': userDestinyId,
       'userDestinyName': userDestinyName,
       'userDestinyNameLastName' : userDestinyNameLastName,
       'userDestinyPhotoProfileUser':userDestinyPhotoProfileUser
      }
    });

    await modal.present();
  }

  async findUsers(){
    
    const modal = await this.modalCrtl.create({
      component: ModalFollowUsersPage
    });

    await modal.present();
  }

  
  doRefresh(event){
    console.log("do refresh")
      this.ngOnInit();
      event.target.complete();
  }
/* 
  findUsers(){
    
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
        this.homeService.getUserToFollow(val)
        .subscribe(data=>{
          console.log(data);   
        })
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  } */

}
