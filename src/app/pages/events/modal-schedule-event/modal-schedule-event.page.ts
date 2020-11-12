import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { EventSheduleDetails } from 'src/app/interfaces/event';
import { ScheduleUserEvent } from 'src/app/models/schedule-user-event-models';
import { EventsService } from '../events.service';
import { Storage } from '@ionic/storage';
import { NotificationService } from '../../notification/notification.service';
import { NotificationModel } from 'src/app/models/notification-model';
import { ModalDetailsEventPage } from '../modal-details-event/modal-details-event.page';

@Component({
  selector: 'app-modal-schedule-event',
  templateUrl: './modal-schedule-event.page.html',
  styleUrls: ['./modal-schedule-event.page.scss'],
})
export class ModalScheduleEventPage implements OnInit {

  //@Input() idUserFromStorage;
  @Input() eventId;
  @Input() eventDate;
  @Input() eventTitle;
  @Input() eventDescp;
  @Input() eventUrlFile;
  
  scheduleUserEvent = new ScheduleUserEvent;
  eventSheduleDetails: EventSheduleDetails[];
  demo: any;
  dayD: any;
  hourD: any;
  minuteD: any;
  secondD: any;

  idUserFromStorage: string;
  
  constructor(private modalCtrl: ModalController,
              private eventService: EventsService,
              private storage: Storage,
              private navCtrl: NavController,
              private notificationService: NotificationService) { }

  ngOnInit() {
    let newEventDate = new Date(this.eventDate)
    this.getUserIdFromStorage();
    this.startCountDownDate(newEventDate)
    this.getEventShedule(this.idUserFromStorage);
    console.log(this.idUserFromStorage);
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
      this.dayD = days;
      this.hourD = hours;
      this.minuteD = minutes;
      this.secondD = seconds;
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
          this.postNotification(this.idUserFromStorage);
        })
  }

  getEventShedule(userId){
    this.eventService.getScheduleUserEvent(userId).subscribe((data: EventSheduleDetails[])=>{
      this.eventSheduleDetails = data;
      console.log(this.eventSheduleDetails);
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

  postNotification(idUser){
    
    let date: Date = new Date();
    let notification= new NotificationModel;
    notification.idUser = idUser;
    notification.notificationDate = date;
    notification.notificationDesc = "Schedule New Event";
   // notification.notificationUrlFile = urlFile;

    this.notificationService.postNotification(notification)
    .subscribe(data=>{
      console.log(data);
  }); 
  }


}
