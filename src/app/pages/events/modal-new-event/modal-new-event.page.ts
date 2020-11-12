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

declare var window: any;

@Component({
  selector: 'app-modal-new-event',
  templateUrl: './modal-new-event.page.html',
  styleUrls: ['./modal-new-event.page.scss'],
})
export class ModalNewEventPage implements OnInit {

  tempImages: string[] = [];
  event : EventModel = new EventModel;
  base64Image:string;
  addModalEvent= new EventAddModal;

  sponsorAvailable: UserSponsor[];
  userSponsor: UserSponsor;
  idUserStorage: string;
  constructor( private http: HttpClient,
               private modalCtrl: ModalController,
               private eventService: EventsService,
               private camera:Camera,
               private storage: Storage,
               private navCtrl: NavController,
               private notificationService: NotificationService) {
     }


  ngOnInit() {
    console.log("user storage" + this.storage.get('idUserFromDb'));
    this.eventService.getAllUserSponsor('enterprise');

    this.eventService.getAllUserSponsor('enterprise').subscribe((data: UserSponsor[])=>{
    this.sponsorAvailable = data;
      console.log(this.sponsorAvailable);
    })

  }

  closeScheduleModal(){
    this.modalCtrl.dismiss();
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
     // sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera.getPicture(options).then((imageData)=>{
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
    }, (err)=>{
      //handle error
    });
   // this.processingImage(options);
  }

  openGallery(){

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then((imageData)=>{
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
    }, (err)=>{
      //handle error
    });
   // this.processingImage(options);
  }

  createEvent(){
    console.log(this.event);

    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is ', val);
        this.event.eventUserId = val;
        this.idUserStorage = val;
        if(this.event != undefined){
          if(this.event.titleEvent != undefined 
            && this.event.descripEvent != undefined  
            && this.event.dateEvent != undefined  
            && this.event.eventType != undefined  
            && this.event.eventCategory != undefined  ){ 
              this.eventService.postNewEvent(this.event)
              .subscribe(data=>{
                console.log(data);
                this.uploadImage();
            }); 
         }else{
            alert("Is mandatory all fields for create new event");
          }
            }else{
              alert("Is mandatory all fields for create new event");
          }
      }else{
        this.navCtrl.navigateRoot('/login');
        console.log("no id user storage! review")
      }
    })

   
  }
  
  uploadImage(){

    let url = 'https://domappssuiteservices.com/Wegaut2020/WegautAppWebServices/PostNewEventImg.php';
    let postData = new FormData();
    postData.append('file', this.base64Image);
    postData.append('eventTitle',this.event.titleEvent);
    postData.append('eventDate',this.event.dateEvent);
    let data: Observable<any> = this.http.post(url,postData);
    data.subscribe((result)=>{
      console.log(result);
      
      this.addModalEvent.title = this.event.titleEvent;
      this.addModalEvent.descrip = this.event.descripEvent;
      this.addModalEvent.date = this.event.dateEvent;
      this.addModalEvent.eventUrlFile = this.base64Image;
      this.postNotification(this.addModalEvent.eventUrlFile);
      this.modalCtrl.dismiss(this.addModalEvent);
    });
    
  }


  postNotification(urlFile){
    
    let date: Date = new Date();
    let notification= new NotificationModel;
    notification.idUser = this.idUserStorage;
    notification.notificationDate = date;
    notification.notificationDesc = "new event created";
    notification.notificationUrlFile = urlFile;

    this.notificationService.postNotification(notification)
    .subscribe(data=>{
      console.log(data);
  }); 
  }

/*   processingImage(options: CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);

      //upload image server
      this.eventService.uploadImage(imageData);

      console.log(img);
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  } */




}
