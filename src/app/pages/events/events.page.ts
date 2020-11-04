import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { EventDetails } from 'src/app/interfaces/event';
import { EventAddModal } from 'src/app/models/event-model';
import { EventLike } from 'src/app/models/schedule-user-event-models';
import { EventsService } from './events.service';
import { ModalDetailsEventPage } from './modal-details-event/modal-details-event.page';
import { ModalNewEventPage } from './modal-new-event/modal-new-event.page';
import { ModalScheduleEventPage } from './modal-schedule-event/modal-schedule-event.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  
  @ViewChild('favIcon') favicon:ElementRef;

  eventDetails: EventDetails[];
  enable = true;
  lstEvents = [];
  eventLike = new EventLike;
  addEventToList = new EventAddModal;
  idUserFromStorage: string;

  constructor(private eventService: EventsService,
              private modalCrtl: ModalController,
              private elementRef: ElementRef,
              private storage: Storage,
              private navCtrl: NavController) { }


  ngOnInit() {
    this.nextEvents();
   // this. getEventsDetails();
   this.getUserIdFromStorage();
  }

  recharge(event){
    this.nextEvents(event,true);
    this.enable = true;
    this.eventDetails = [];
  }

  nextEvents(event?, pull: boolean = false){
    this.eventService.getEventsDetails(pull)
      .subscribe((data: EventDetails[])=>{
        console.log(data);
        this.eventDetails = data;
        if(this.eventDetails != null){
          for(let i = 0; i < this.eventDetails.length; i++){
            var obj = this.eventDetails[i];
            console.log(obj);
            this.lstEvents.push(obj);
         }
        }
        if(event){
          event.target.complete();
          if(this.eventDetails == null){
            this.enable = false
          }
        }
      });
  }
  
  likeEvent(eventId){
    console.log("like event" + eventId);
    this.eventLike.eventId = eventId;
    this.eventLike.userId = "1";
    console.log("like event" + this.eventLike.eventId);
    this.eventService.postNewLikeEvent(this.eventLike)
    .subscribe(data=>{
      console.log(data);   
    })
  }

  getUserIdFromStorage(){
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
       this.idUserFromStorage = val;
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  async scheduleEvent(eventId,eventDate){
    console.log("shedule event" + eventId);
    console.log("event date " + eventDate);
    const modal = await this.modalCrtl.create({
      component: ModalScheduleEventPage,
      componentProps:{
        'idUserFromStorage': this.idUserFromStorage,
        'eventId': eventId,
        'eventDate': eventDate
      }
    });
    await modal.present();
  }

  async newEvent(){
    const modal = await this.modalCrtl.create({
      component: ModalNewEventPage
      //,
     // componentProps:{
      //  'eventId': eventId, need pass the user 
     //   'eventDate': eventDate
    //  }
    });

    modal.onDidDismiss()
    .then((data) => {
      console.log("Entro en el modal didmiss")
      console.log(data);

      if(data.data != undefined){
        if(data.data.date != undefined 
          && data.data.descrip != undefined  
          && data.data.date != undefined  
          && data.data.eventUrlFile != undefined  
          && data.data.title != undefined  ){
         this.lstEvents.unshift(data.data);
         console.log("imprimiendo la lista");
         console.log(this.lstEvents);
       }
      }
    });
    await modal.present();
  
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



  

/*   getEventsDetails(){
    this.eventService.getEventsDetails().subscribe((data: EventDetails[])=>{
      this.eventDetails = data;
      console.log(this.eventDetails);
    })
  }
 */
}
