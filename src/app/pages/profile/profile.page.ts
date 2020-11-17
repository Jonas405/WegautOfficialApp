import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ProfileService } from './profile.service';
import { Storage } from '@ionic/storage';
import { EventProfileUser } from 'src/app/interfaces/event';
import { UserEventNum, UserFollowersNumber, UserProfile } from 'src/app/interfaces/user-profile';
import { ModalScheduleEventPage } from '../events/modal-schedule-event/modal-schedule-event.page';
import { ModalDetailsEventPage } from '../events/modal-details-event/modal-details-event.page';
import { ModalFavEventUserPage } from '../events/modal-fav-event-user/modal-fav-event-user.page';
import { ModalFollowersDetailsPage } from './modal-followers-details/modal-followers-details.page';
import { ModalProfileSettingsPage } from './modal-profile-settings/modal-profile-settings.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  eventProfileUser: EventProfileUser[];
  userProfile: UserProfile;
  userFollowersNumber: UserFollowersNumber;
  userEventNumber: UserEventNum;
  userStorageId: string;
  constructor(
               private profileService: ProfileService,
               private storage: Storage,
               private navCtrl: NavController,
               private modalCrtl: ModalController) { }

  ngOnInit() {
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is ', val);
        this.getUserProfileInfo(val);
        this.getUserEventsInfo(val);
        this.getUserFollowers(val);
        this.getUserEventNum(val);
        this.userStorageId = val;
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  logout(){

  }

  userBrand: string;
  userName: string;
  userTradeName: string;
  userProfilePicture: string;
  userType: string;
  userAbout: string;
  userLevel: string;

  getUserProfileInfo(userId){
    this.profileService.getUserProfileDetails(userId)
    .subscribe((data)=>{
    
      console.log("profile user details userBrand" + data[0].userBrand);
      console.log("profile user details userName" + data[0].userName);
      console.log("profile user details userTradeName" + data[0].userTradeName);
      console.log("profile user details userProfilePicture" + data[0].userProfilePicture);
      console.log("profile user details userType" + data[0].userType);
      console.log("profile user details userType" + data[0].userAbout);

      this.userBrand = data[0].userBrand;
      this.userName = data[0].userName;
      this.userTradeName = data[0].userTradeName;
      this.userProfilePicture = data[0].userProfilePicture;
      this.userType = data[0].userType;
      this.userAbout = data[0].userAbout;
      this.userLevel = data[0].userLevel;
    
  });
}

getUserEventsInfo(userId){
  this.profileService.getUserProfileEventsDetails(userId)
  .subscribe((data)=>{
    this.eventProfileUser = data;
    console.log(data);
  })
}

getUserFollowers(userId){
  this.profileService.getUserFollowers(userId)
  .subscribe((data)=>{
    this.userFollowersNumber = data[0].followers;
    console.log(data);
  })
}

getUserEventNum(userId){
  this.profileService.getEventUserNum(userId)
  .subscribe((data)=>{
    this.userEventNumber = data[0].userEventNumber;
    console.log(data);
  })
}

async goToScheduleEvents(){
  this.storage.get('idUserFromDb').then((val)=>{
    if(val != null ){
      console.log('Your id from db storage is ', val);
      this.scheduleEvent(val);

    }else{
      this.navCtrl.navigateRoot('/login');
    }
  });
}

async scheduleEvent(userId){
  const modal = await this.modalCrtl.create({
    component: ModalScheduleEventPage,
    componentProps:{
      'idUserFromStorage': userId,
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

  async getUserFavEvets(){
    console.log(this.userStorageId);
    const modal = await this.modalCrtl.create({
      component: ModalFavEventUserPage,
      componentProps:{
      'userId': this.userStorageId
      }
    });

    await modal.present();
  }

  async checkFollowers(){
    
    const modal = await this.modalCrtl.create({
      component: ModalFollowersDetailsPage
    });

    await modal.present();
  }

  async settingsProfile(){
    
    const modal = await this.modalCrtl.create({
      component: ModalProfileSettingsPage
    });

    await modal.present();
  }

  doRefresh(event){
    console.log("do refresh")
    this.userProfilePicture = null;
      this.ngOnInit();
      event.target.complete();
  }
   
}
