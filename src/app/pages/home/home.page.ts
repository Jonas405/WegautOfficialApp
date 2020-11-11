import { Component} from '@angular/core';
import { EventsService } from '../events/events.service';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { EventSheduleDetails } from 'src/app/interfaces/event';
import { CountdownComponent } from 'ngx-countdown';
import { HomeService } from './home.service';
import { ModalFollowUsersPage } from './modal-follow-users/modal-follow-users.page';
import { ModalDetailsEventPage } from '../events/modal-details-event/modal-details-event.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  eventSheduleDetails : EventSheduleDetails[];
  //demo: any;
  
  constructor(private eventService: EventsService,
              private storage: Storage,
              private navCtrl: NavController,
              private modalCrtl: ModalController,
              private homeService: HomeService) {}



  ngOnInit() {
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
        this.getEventShedule(val);
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })

    console.log("valor onInitTest")
   // console.log(this.startCountDownDate("2021-11-03"));
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
       demo = days +"d " + hours + "h ";
       return demo;
    
    //  console.log("valor abajo");
   } 

   async getDetailsEvent(eventId){
    console.log("this is the view details"+eventId);
    
    const modal = await this.modalCrtl.create({
      component: ModalDetailsEventPage,
      componentProps:{
       'eventId': eventId
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
