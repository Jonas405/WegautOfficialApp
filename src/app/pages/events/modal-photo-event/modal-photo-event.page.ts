import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventsService } from '../events.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { EventPhoto } from 'src/app/models/event-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-photo-event',
  templateUrl: './modal-photo-event.page.html',
  styleUrls: ['./modal-photo-event.page.scss'],
})
export class ModalPhotoEventPage implements OnInit {

  @Input() eventId;
  @Input() userId;

  base64Image:string;
  photoUpdate:number;
  eventPhotoModel = new EventPhoto;

  constructor(private modalCrtl: ModalController,
              private eventService: EventsService,
              private camera:Camera,
              private http: HttpClient) { }

  ngOnInit() {
    console.log(this.eventId);
    console.log(this.userId);
  }

  newEventPhoto(){
    this.photoUpdate = Math.random();
    this.eventPhotoModel.urlPhoto = this.photoUpdate.toString();
    this.eventPhotoModel.eventId = this.eventId;
    this.eventPhotoModel.userId = this.userId;
    this.eventPhotoModel.urlPhoto = this.eventId + this.userId + this.photoUpdate;
    console.log(this.eventPhotoModel);
    this.eventService.postPhotoEvent(this.eventPhotoModel)
    .subscribe(data=>{
      alert("photo uploaded");
      console.log(data);
      this.uploadImage();
      
    }); 
  }

  closePhotoEvent(){
    this.modalCrtl.dismiss();
  }

  //upload photo methods
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


  uploadImage(){

    console.log(this.base64Image);
    console.log("after");
    if(this.base64Image != undefined){
      console.log(this.base64Image);

      let url = 'https://domappssuiteservices.com/Wegaut2020/WegautAppWebServices/PostNewPhotoEvent.php';
      let postData = new FormData();
      postData.append('file', this.base64Image);
      postData.append('eventId', this.eventId);
      postData.append('userId', this.userId);
      postData.append('url', this.eventPhotoModel.urlPhoto);
      let data: Observable<any> = this.http.post(url,postData);
      data.subscribe((result)=>{
        console.log(result);
        this.closePhotoEvent();
      });
    }else{
      console.log("no update photo");
      console.log(this.base64Image);
    }
  }

}
