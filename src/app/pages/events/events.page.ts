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
import { b2bCreateGroupModel } from 'src/app/models/b2b-create-group-model';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  
  @ViewChild('favIcon') favicon:ElementRef;

 
  idUserFromStorage: string;
  myGroups: b2bCreateGroupModel[];


  constructor(private eventService: EventsService,
              private modalCrtl: ModalController,
              private elementRef: ElementRef,
              private storage: Storage,
              private navCtrl: NavController) { }


  ngOnInit() {
 
   // this. getEventsDetails();
   this.getUserIdFromStorage();
  }

  getUserIdFromStorage(){
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
       this.idUserFromStorage = val;
       this.getMyGroups(val);
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  getMyGroups(myUserId){
    this.eventService.getMyGroups(myUserId)
    .subscribe((data)=>{
      this.myGroups = data;
      console.log(data);
    });
  }

  async openChatRoom(chatRoomId, nameRoom){
    console.log("chat room id" + chatRoomId);
    const modal = await this.modalCrtl.create({
      component: ModalScheduleEventPage,
      componentProps:{
        'chatRoomId': chatRoomId,
        'nameRoom': nameRoom
      }
    });
    await modal.present();
  }

  async newGroup(){
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
       //  this.lstEvents.unshift(data.data);
         console.log("imprimiendo la lista");
        // console.log(this.lstEvents);
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

}