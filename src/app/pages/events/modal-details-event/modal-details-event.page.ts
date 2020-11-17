import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { EventComments, SelectedEventDetails } from 'src/app/interfaces/event';
import { UserSponsor } from 'src/app/interfaces/userSponsor';
import { ModalDetailsProfilePage } from '../../profile/modal-details-profile/modal-details-profile.page';
import { EventsService } from '../events.service';
import { Storage } from '@ionic/storage';
import { EventLike } from 'src/app/models/schedule-user-event-models';
import { ModalScheduleEventPage } from '../modal-schedule-event/modal-schedule-event.page';
import { UserComment } from 'src/app/models/user-model';

@Component({
  selector: 'app-modal-details-event',
  templateUrl: './modal-details-event.page.html',
  styleUrls: ['./modal-details-event.page.scss'],
})
export class ModalDetailsEventPage implements OnInit {

    //**** toolbar for hide and show ****/
    showToolbar = false;
    showColor = false;
    showTitle = false;
    transition:boolean = false;
      
  

avatarSlide = {
  slidesPerView: 3.5
}
  selectedEvent: SelectedEventDetails[];
  sponsorDetails: UserSponsor[];
  eventLike = new EventLike;
  idUserFromStorage: string;
  selectedDateEvent: string ;

  commentsEvent: EventComments[];
  commentUser = new UserComment;


  @Input() eventId;
  constructor(private modalCrtl: ModalController,
              private eventService: EventsService,
              private storage: Storage,
              private navCtrl: NavController) { }
    
  ngOnInit() {
    console.log(this.eventId);
    this.getUserIdFromStorage();
    this.eventService.getDetailsEventId(this.eventId)
      .subscribe((data)=>{
        this.selectedEvent = data;

        this.selectedDateEvent = data[0].eventDate;

        console.log(data);
      });
      this.getSponsorOnSelectedEvent();
      this.getCommentsEvent(this.eventId);
  }

  getSponsorOnSelectedEvent(){
    this.eventService.getSponsorOnSelectedEvent(this.eventId)
    .subscribe((data)=>{
        this.sponsorDetails = data;
        console.log(data);
    });
  }


  async goToSponsorProfile(sponsorUserId){
    console.log("this is the view details"+sponsorUserId);
    const modal = await this.modalCrtl.create({
      component: ModalDetailsProfilePage,
      componentProps:{
       'sponsorUserId': sponsorUserId
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

    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
        this.eventLike.eventId = eventId;
        this.eventLike.userId = val;
        console.log("like event" + this.eventLike.eventId);
        this.eventService.postNewLikeEvent(this.eventLike)
        .subscribe(data=>{
          console.log(data);   
        })
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

  getCommentsEvent(eventId){
    this.eventService.getCommentsEvent(eventId)
    .subscribe((data:EventComments[])=>{
        this.commentsEvent = data;
        console.log(data);
    });
  }

  addComment(){
    let date: Date = new Date();  
    console.log("llamo al addComment")
    this.commentUser.userId = this.idUserFromStorage;
    this.commentUser.eventId = this.eventId;
    this.commentUser.commentDate = date.toDateString();
    console.log(this.commentUser);

    this.eventService.postCommentEvent(this.commentUser)
        .subscribe(data=>{
          console.log(data);   
          this.getCommentsEvent(this.eventId);
        });

        this.commentUser.comment = '';
  }
  closeEventDetail(){
    this.modalCrtl.dismiss();
  }


  onScroll($event: CustomEvent) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.transition = true;
      this.showToolbar = scrollTop >= 160;
      //console.log("showToolbar="+this.showToolbar);
      this.showTitle = scrollTop >= 160;
      //console.log("showTitle="+this.showTitle);
    }else{
      this.transition = false;
    }
  }

  doRefresh(event){
    console.log("do refresh")
      this.ngOnInit();
      event.target.complete();
  }
   

    async openImageViewer(image){
    /*   console.log("this is the view details"+sponsorUserId);
      const modal = await this.modalCrtl.create({
        component: ModalDetailsProfilePage,
        componentProps:{
         'sponsorUserId': sponsorUserId
        }
      });
  
      await modal.present(); */
    }

    addPhotoToEvent(){
      console.log("add photo to event");
    }



}
