import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { UserFollow } from 'src/app/models/user-model';
import { HomeService } from '../../home/home.service';

import { Storage } from '@ionic/storage';
import { ModalDetailsProfilePage } from '../modal-details-profile/modal-details-profile.page';

@Component({
  selector: 'app-modal-followers-details',
  templateUrl: './modal-followers-details.page.html',
  styleUrls: ['./modal-followers-details.page.scss'],
})
export class ModalFollowersDetailsPage implements OnInit {


  usersProfile : UserProfile[];
  userFollow = new UserFollow;

  @Input() sponsorUserId;
  @Input() userName;

  constructor(private modalCrtl: ModalController,
              private storage: Storage,
              private navCtrl: NavController,
              private homeService: HomeService) { }

  ngOnInit() {

    if(!this.sponsorUserId){

      this.storage.get('idUserFromDb').then((val)=>{
        if(val != null ){
          console.log('Your id from db storage is home ', val);
          this.homeService.getFollowersUser(val)
          .subscribe((data: UserProfile[])=>{
            this.usersProfile = data;
            console.log(this.usersProfile); 
          })
        }else{
          this.navCtrl.navigateRoot('/login');
        }
      })
    }else{
      this.homeService.getFollowersUser(this.sponsorUserId)
      .subscribe((data: UserProfile[])=>{
        this.usersProfile = data;
        console.log(this.usersProfile); 
      })
    }

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


  closeScheduleModal(){
    this.modalCrtl.dismiss();
  }

}
