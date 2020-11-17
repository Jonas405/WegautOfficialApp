import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserModel } from 'src/app/models/user-model';
import { ProfileService } from '../profile.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-profile-settings',
  templateUrl: './modal-profile-settings.page.html',
  styleUrls: ['./modal-profile-settings.page.scss'],
})
export class ModalProfileSettingsPage implements OnInit {

  userStorageId: string;
  userBrand: string;
  userName: string;
  userTradeName: string;
  userProfilePicture: string;
  userType: string;
  userAbout: string;
  userLevel: string;
  userEmail: string;
  userPass: string;
  base64Image:string;

  userModel = new UserModel;

  photoUpdate:number;


  constructor(  private profileService: ProfileService,
                private storage: Storage,
                private http: HttpClient,
                private camera:Camera,
                private navCtrl: NavController,
                private modalCrtl: ModalController) { }

  ngOnInit() {
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is ', val);
        this.userStorageId = val;
        this.getUserProfileInfo(val);
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

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
      this.userEmail = data[0].userEmail;
      this.userPass = data[0].userPass;
    
  });
}

closeScheduleModal(){
  this.modalCrtl.dismiss();
}

  updateProfile(userUpdate){
  
  this.photoUpdate = Math.random();
  this.userModel.userUrlProfilePicture = this.photoUpdate.toString();

  userUpdate = this.userModel;
  this.userModel.userId = this.userStorageId;
  console.log(this.userModel);
  this.profileService.postUpdateProfile(this.userModel)
  .subscribe(data=>{
    alert("update successful");
    console.log(data);
    this.uploadImage();
  });
  }

  logout(){
    this.modalCrtl.dismiss();
    this.navCtrl.navigateRoot('/login');
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


  uploadImage(){

    console.log(this.base64Image);
    console.log("after");
    if(this.base64Image != undefined){
      console.log(this.base64Image);

      let url = 'https://domappssuiteservices.com/Wegaut2020/WegautAppWebServices/PostUpdateImageProfile.php';
      let postData = new FormData();
      postData.append('file', this.base64Image);
      postData.append('userId',this.userStorageId);
      postData.append('url', this.userModel.userUrlProfilePicture);
      let data: Observable<any> = this.http.post(url,postData);
      data.subscribe((result)=>{
        console.log(result);
        this.closeScheduleModal();
      });
    }else{
      console.log("no update photo");
      console.log(this.base64Image);
    }
  }
}

