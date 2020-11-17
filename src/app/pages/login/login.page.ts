import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonSlides, NavController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user-model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slideMain') slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  user : UserModel = new UserModel;
  public showPassword: boolean = false;
  avatarSlide = {
    slidesPerView: 3.5
  }

  constructor(private serviceLogin: LoginService,
              private navCtrl: NavController,
              public alertController: AlertController) { }

  ngOnInit() {
  //  this.slides.lockSwipes(true);
  }

  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  selectedAvatar(avatar){
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;

  }

  login( fLogin: NgForm ){

    if(fLogin.invalid){return;}
    // this.loginService.login(this.loginUser.email, this.loginUser.password)
    console.log(fLogin.valid);
    console.log(this.user);
    this.serviceLogin.userlogin(this.user.userEmail, this.user.userPass)
    .subscribe(data=>{
          let navigateParameter = data[0].userId;
          let userName = data[0].userName;
          let userLastName = data[0].userLastName;
          let userBrand = data[0].userBrand;
          let userTradeName = data[0].userTradeName;
          console.log("return parameter");
          console.log(userName + userLastName + userBrand + userTradeName);
          console.log(navigateParameter);
          this.navCtrl.navigateRoot('/main/tabs/events', { animated:true });
    },
     error =>{
      this.presentAlert("User and Password Incorrect, please try again");
     });
  }

  async presentAlert(message:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  register( fRegister: NgForm){
    console.log(fRegister.valid);
    fRegister.reset();

  }

  showLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  showRegister(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  registerUser(fRegister: NgForm){
    console.log(this.user);

    if(this.user.userType == undefined){
      this.presentAlert("User type is mandatory");
    }

    if(this.user.userType === 'user'){
        this.serviceLogin.postRegisterUser(this.user)
        .subscribe(data=>{
          alert("register successful");
          fRegister.reset();
          console.log(data);
          this.showRegister();
        },
        error =>{
         this.presentAlert("this email already exists, please tray with another");
        });
    } 
    
    if(this.user.userType === 'enterprise'){
      this.serviceLogin.postRegisterEnterpriseUser(this.user)
      .subscribe(data=>{
        console.log(data);
        alert("register successful");
        fRegister.reset();
        this.showRegister();
      },
      error =>{
       this.presentAlert("this email already exists, please try whit another");
      });
    }


  }

}
