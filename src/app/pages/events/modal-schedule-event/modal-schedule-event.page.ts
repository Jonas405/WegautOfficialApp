import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventSheduleDetails } from 'src/app/interfaces/event';
import { ScheduleUserEvent } from 'src/app/models/schedule-user-event-models';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-modal-schedule-event',
  templateUrl: './modal-schedule-event.page.html',
  styleUrls: ['./modal-schedule-event.page.scss'],
})
export class ModalScheduleEventPage implements OnInit {

  @Input() idUserFromStorage;
  @Input() eventId;
  @Input() eventDate;
  scheduleUserEvent = new ScheduleUserEvent;
  eventSheduleDetails: EventSheduleDetails[];
  demo: any;
  
  constructor(private modalCtrl: ModalController,
              private eventService: EventsService) { }

  ngOnInit() {
    let newEventDate = new Date(this.eventDate)
    this.startCountDownDate(newEventDate)
    this.getEventShedule(this.idUserFromStorage);
    console.log(newEventDate);
  }

  startCountDownDate(newEventDate){
    
   let x = setInterval(()=>{
      let now = new Date().getTime();
      let distance = newEventDate- now;
       // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.demo = days +"d " + hours + "h " + minutes +"m " + seconds +"s ";
      if(distance<0){
        clearInterval(x);
        this.demo = "Expired"
      }
     })
  }

  closeScheduleModal(){
      this.modalCtrl.dismiss();
  }

  postScheduleEvent(eventId){
    console.log("inside post schedule" + eventId);
    this.scheduleUserEvent.eventId = eventId;
    this.scheduleUserEvent.userId = this.idUserFromStorage;
    console.log( this.scheduleUserEvent.eventId)
    console.log( this.scheduleUserEvent.userId);

    this.eventService.postNewScheduleEvent(this.scheduleUserEvent)
        .subscribe(data=>{
          console.log(data);
          this.getEventShedule(this.idUserFromStorage);
        })
  }

  getEventShedule(userId){
    this.eventService.getScheduleUserEvent(userId).subscribe((data: EventSheduleDetails[])=>{
      this.eventSheduleDetails = data;
      console.log(this.eventSheduleDetails);
    })
  }

}
