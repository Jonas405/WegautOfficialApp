import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventDetails } from 'src/app/interfaces/event';
import { EventLike } from 'src/app/models/schedule-user-event-models';
import { ProfileService } from '../../profile/profile.service';
import { EventsService } from '../events.service';
import { ModalDetailsEventPage } from '../modal-details-event/modal-details-event.page';
import { ModalScheduleEventPage } from '../modal-schedule-event/modal-schedule-event.page';

@Component({
  selector: 'app-modal-fav-event-user',
  templateUrl: './modal-fav-event-user.page.html',
  styleUrls: ['./modal-fav-event-user.page.scss'],
})
export class ModalFavEventUserPage implements OnInit {

  @Input() userId;
  eventLike = new EventLike;
  eventFavUser: EventDetails[];
  constructor(private modalCtrl: ModalController,
              private profileService: ProfileService,
              private eventService: EventsService) { }

  ngOnInit() {
    console.log(this.userId);
    this.getUserFavEvent();
  }

  getUserFavEvent(){
    this.profileService.getUserFavEvent(this.userId).subscribe((data: EventDetails[])=>{
      this.eventFavUser = data;
      console.log(this.eventFavUser);
    })
  }

  async getDetailsEvent(eventId){
    console.log("this is the view details"+eventId);    
    const modal = await this.modalCtrl.create({
      component: ModalDetailsEventPage,
      componentProps:{
       'eventId': eventId
      }
    });

    await modal.present();
  }

  async scheduleEvent(eventId,eventDate){
    console.log("shedule event" + eventId);
    console.log("event date " + eventDate);
    const modal = await this.modalCtrl.create({
      component: ModalScheduleEventPage,
      componentProps:{
        'idUserFromStorage': this.userId,
        'eventId': eventId,
        'eventDate': eventDate
      }
    });
    await modal.present();
  }

  incrementLike(event){
    event.userFaveDate = true; 
    console.log(event);
    var x = event.eventLikes 
    var y : number = +x;
    console.log(y);
    event.eventLikes = y + 1;
    console.log(event.eventLikes);
   }
  
  likeEvent(eventId){

        this.eventLike.eventId = eventId;
        this.eventLike.userId = this.userId;
        console.log("like event" + this.eventLike.eventId);
        this.eventService.postNewLikeEvent(this.eventLike)
        .subscribe(data=>{
          console.log(data);   
        })
  }


  closeScheduleModal(){
    this.modalCtrl.dismiss();
}

}
