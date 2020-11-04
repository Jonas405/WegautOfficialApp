import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProfileService } from './profile.service';
import { Storage } from '@ionic/storage';
import { EventProfileUser } from 'src/app/interfaces/event';
import { UserProfile } from 'src/app/interfaces/user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  eventProfileUser: EventProfileUser[];
  userProfile: UserProfile;
  constructor(
               private profileService: ProfileService,
               private storage: Storage,
               private navCtrl: NavController) { }

  ngOnInit() {
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is ', val);
        this.getUserProfileInfo(val);
        this.getUserEventsInfo(val);
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  logout(){

  }


  getUserProfileInfo(userId){
    this.profileService.getUserProfileDetails(userId)
    .subscribe((data)=>{
      console.log("profile user details userBrand" + data[0].userBrand);
      console.log("profile user details userName" + data[0].userName);
      console.log("profile user details userTradeName" + data[0].userTradeName);
      console.log("profile user details userProfilePicture" + data[0].userProfilePicture);
      console.log("profile user details userType" + data[0].userType);
  });
}

getUserEventsInfo(userId){
  this.profileService.getUserProfileEventsDetails(userId)
  .subscribe((data)=>{
    this.eventProfileUser = data;
    console.log(data);
  })
}

}
