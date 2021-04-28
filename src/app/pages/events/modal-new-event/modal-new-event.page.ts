import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EventAddModal, EventModel } from 'src/app/models/event-model';
import { EventsService } from '../events.service';
import { Storage } from '@ionic/storage';
import { UserSponsor } from 'src/app/interfaces/userSponsor';
import { NotificationService } from '../../notification/notification.service';
import { NotificationModel } from 'src/app/models/notification-model';
import { NotificationDetails } from 'src/app/interfaces/notification';
import { b2bUserModel } from 'src/app/models/b2b-user-model';
import { ProfileService } from '../../profile/profile.service';
import { ModalFollowUsersPage } from '../../home/modal-follow-users/modal-follow-users.page';
import { b2bCreateGroupModel } from 'src/app/models/b2b-create-group-model';

declare var window: any;

@Component({
  selector: 'app-modal-new-event',
  templateUrl: './modal-new-event.page.html',
  styleUrls: ['./modal-new-event.page.scss'],
})
export class ModalNewEventPage implements OnInit {

  userStorageId: string;
  notificationDetails: NotificationDetails[];
  userProfileContacts: b2bUserModel[];

  lstUserGroup = [];
  groupName;
  b2bCreateGroupModel = new b2bCreateGroupModel();
  
  constructor( private notificationService: NotificationService,
    private profileService: ProfileService,
    private storage: Storage,
    private navCtrl: NavController,
    private modalCrtl: ModalController) {
     }


     ngOnInit() {
      this.storage.get('idUserFromDb').then((val)=>{
        if(val != null ){
          console.log('Your id from db storage is ', val);
          this.userStorageId = val;
          this.getUserProfileContacts(val);
        //  this.getNotifications(val);
        }else{
          this.navCtrl.navigateRoot('/login');
        }
      })
    }
  
    getUserProfileContacts(userId){
      this.profileService.getUserContacts(userId)
      .subscribe((data)=>{
        this.userProfileContacts = data;
        console.log(data);
      })
    }
    
    
    async findUsers(){
      
      const modal = await this.modalCrtl.create({
        component: ModalFollowUsersPage
      });
  
      await modal.present();
    }
  
  
    //-------------------
    getNotifications(idUser){
      this.notificationService.getNotificationUser(idUser)
      .subscribe((data)=>{
        this.notificationDetails = data;
        console.log(data);
      })
    }
        
    doRefresh(event){
      console.log("do refresh")
        this.ngOnInit();
        event.target.complete();
    }

    addContact(userIdDestiny){

      this.lstUserGroup.push(userIdDestiny);
      console.log(this.lstUserGroup);
  /* 
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
      }) */
  
    }

    changeShowFollow(user){
      user.userFollow = true;
    }
     
    createGroup(){

    


      let date: Date = new Date();  
      this.lstUserGroup.push(this.userStorageId);
      console.log(this.lstUserGroup);
      this.b2bCreateGroupModel.users_id = this.lstUserGroup;

      //print json converted from array 


      this.b2bCreateGroupModel.created_at = date.toDateString();
      this.b2bCreateGroupModel.name = this.groupName;

      this.notificationService.postAddNewGroup
      this.notificationService.postAddNewGroup(this.b2bCreateGroupModel)
      .subscribe(data=>{
        console.log(data);   
        console.log(this.b2bCreateGroupModel);
      })
  
      this.modalCrtl.dismiss();
    }
  
  
  }
  