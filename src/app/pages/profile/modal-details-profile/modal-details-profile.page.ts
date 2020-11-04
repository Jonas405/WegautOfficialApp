import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-modal-details-profile',
  templateUrl: './modal-details-profile.page.html',
  styleUrls: ['./modal-details-profile.page.scss'],
})
export class ModalDetailsProfilePage implements OnInit {
  
  @Input() sponsorUserId;

  constructor( private profileService: ProfileService) { }

  ngOnInit() {
    console.log("sponsor from modal"+this.sponsorUserId);
    this.getUserProfileInfo(this.sponsorUserId);
    this.getUserEventsInfo(this.sponsorUserId);
  }

  getUserProfileInfo(userId){
      this.profileService.getUserProfileDetails(userId)
      .subscribe((data)=>{
        console.log("profile user details" + data[0].userBrand);
        console.log("profile user details" + data[0].userName);
        console.log("profile user details" + data[0].userTradeName);
        console.log("profile user details" + data[0].userProfilePicture);
        console.log("profile user details" + data[0].userType);
    });
  }

  getUserEventsInfo(userId){
    this.profileService.getUserProfileEventsDetails(userId)
    .subscribe((data)=>{
      console.log(data);
    })
  }

}
