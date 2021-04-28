import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserModel } from 'src/app/models/user-model';
import { ProfileService } from '../profile.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { b2bUserModel } from 'src/app/models/b2b-user-model';

@Component({
  selector: 'app-modal-profile-settings',
  templateUrl: './modal-profile-settings.page.html',
  styleUrls: ['./modal-profile-settings.page.scss'],
})
export class ModalProfileSettingsPage implements OnInit {

  userId: string;
  userEmail:       string;
  userPass:       string;
  userTlf:       string;
  userName:       string;
  userLastName:       string;
  photoProfileUser:       string;
  createAt:       string;
  userAbout:       string;
  base64Image:string;
  photoUpdate:number;
  b2bUserModel = new b2bUserModel;
  //userModel = new UserModel;

  


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
        this.userId = val;
        this.getUserProfileInfo(val);
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  getUserProfileInfo(userId){
    this.profileService.getUserProfileDetails(userId)
    .subscribe((data)=>{
    
/*       console.log("profile user details userBrand" + data[0].userBrand);
      console.log("profile user details userName" + data[0].userName);
      console.log("profile user details userTradeName" + data[0].userTradeName);
      console.log("profile user details userProfilePicture" + data[0].userProfilePicture);
      console.log("profile user details userType" + data[0].userType);
      console.log("profile user details userType" + data[0].userAbout);
 */
      this.userName = data[0].userName;
      this.userLastName = data[0].userLastName;
      this.userTlf = data[0].userTlf;
      this.photoProfileUser = data[0].photoProfileUser;
      this.userAbout = data[0].userAbout;
      this.userEmail = data[0].userEmail;
      this.userPass = data[0].userPass;
    
  });
}

closeScheduleModal(){
  this.modalCrtl.dismiss();
}

  updateProfile(userUpdate){
  
  this.photoUpdate = Math.random();
  this.b2bUserModel.photoProfileUser = this.photoUpdate.toString();

  userUpdate = this.b2bUserModel;
  this.b2bUserModel.userId = this.userId;
  console.log(this.b2bUserModel);
  this.profileService.postUpdateProfile(this.b2bUserModel)
  .subscribe(data=>{
    alert("update successful");
    console.log(data);
    this.uploadImage();
    this.closeScheduleModal();
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

      let url = 'https://domappssuiteservices.com/B2B/WebServices/PostUpdateImageProfile.php';
      let postData = new FormData();
      postData.append('file', this.base64Image);
      postData.append('userId',this.userId);
      postData.append('url', this.b2bUserModel.photoProfileUser);
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

