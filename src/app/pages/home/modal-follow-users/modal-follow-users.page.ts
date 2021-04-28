import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { HomeService } from '../home.service';
import { Storage } from '@ionic/storage';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { UserFollow } from 'src/app/models/user-model';
import { ModalDetailsProfilePage } from '../../profile/modal-details-profile/modal-details-profile.page';
import { NotificationService } from '../../notification/notification.service';
import { b2bUserModel } from 'src/app/models/b2b-user-model';
import { b2bAddContact } from 'src/app/models/b2b-add-contact-model';

@Component({
  selector: 'app-modal-follow-users',
  templateUrl: './modal-follow-users.page.html',
  styleUrls: ['./modal-follow-users.page.scss'],
})
export class ModalFollowUsersPage implements OnInit {

  usersProfile : b2bUserModel[];
  userFollow = new UserFollow;
  b2bAddContact = new b2bAddContact;

  constructor(private modalCrtl: ModalController,
              private storage: Storage,
              private navCtrl: NavController,
              private homeService: HomeService,
              private notificationService: NotificationService) { }

  ngOnInit() {

    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){

        console.log('Your id from db storage is home ', val);
        this.notificationService.getNewContacts(val)
        .subscribe((data: b2bUserModel[])=>{
          this.usersProfile = data;
          console.log(this.usersProfile); 
        })
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  addContact(userIdDestiny){
  
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
        console.log(userIdDestiny)
        this.b2bAddContact.id_user_destiny = userIdDestiny;
        this.b2bAddContact.id_user_origin = val;
        console.log(this.b2bAddContact);
        this.notificationService.postAddNewContact(this.b2bAddContact)
        .subscribe(data=>{
          console.log(data);   
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
