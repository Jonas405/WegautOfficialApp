import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { HomeService } from '../home.service';
import { Storage } from '@ionic/storage';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { UserFollow } from 'src/app/models/user-model';
import { ModalDetailsProfilePage } from '../../profile/modal-details-profile/modal-details-profile.page';

@Component({
  selector: 'app-modal-follow-users',
  templateUrl: './modal-follow-users.page.html',
  styleUrls: ['./modal-follow-users.page.scss'],
})
export class ModalFollowUsersPage implements OnInit {

  usersProfile : UserProfile[];
  userFollow = new UserFollow;

  constructor(private modalCrtl: ModalController,
              private storage: Storage,
              private navCtrl: NavController,
              private homeService: HomeService) { }

  ngOnInit() {

    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
        this.homeService.getUserToFollow(val)
        .subscribe((data: UserProfile[])=>{
          this.usersProfile = data;
          console.log(this.usersProfile); 
        })
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  followUser(userId){
  
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
        console.log(userId)
        this.userFollow.userIdFollowed = userId;
        this.userFollow.userIdFollower = val;
        this.homeService.postFollowUser(this.userFollow)
        .subscribe(data=>{
          console.log(data);   
        })
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
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

  changeShowFollow(user){
    user.userFollow = true;
  }

  

}
