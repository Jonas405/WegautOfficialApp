import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectedEventDetails } from 'src/app/interfaces/event';
import { UserSponsor } from 'src/app/interfaces/userSponsor';
import { ModalDetailsProfilePage } from '../../profile/modal-details-profile/modal-details-profile.page';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-modal-details-event',
  templateUrl: './modal-details-event.page.html',
  styleUrls: ['./modal-details-event.page.scss'],
})
export class ModalDetailsEventPage implements OnInit {

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

avatarSlide = {
  slidesPerView: 3.5
}
  selectedEvent: SelectedEventDetails[];
  sponsorDetails: UserSponsor[];

  @Input() eventId;
  constructor(private modalCrtl: ModalController,
              private eventService: EventsService) { }

  ngOnInit() {
    console.log(this.eventId);
    this.eventService.getDetailsEventId(this.eventId)
      .subscribe((data)=>{
        this.selectedEvent = data;
        console.log(data);
      });
      this.getSponsorOnSelectedEvent();
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

  closeEventDetail(){
    this.modalCrtl.dismiss();
  }

}
