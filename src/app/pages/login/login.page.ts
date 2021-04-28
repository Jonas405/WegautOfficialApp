import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonSlides, NavController } from '@ionic/angular';
import { b2bUserModel } from 'src/app/models/b2b-user-model';
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

  user : b2bUserModel = new b2bUserModel;
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
    console.log(this.user.userEmail);
    console.log(this.user.userPass);
    this.serviceLogin.userlogin(this.user.userEmail, this.user.userPass)
    .subscribe(data=>{
      console.log("entro aqui o no?");
      console.log(data);
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

  register( fRegister: NgForm){
    console.log(fRegister.valid);
    if(fRegister.valid ==true){
      console.log(this.user);
      this.registerUser(fRegister);
    }
  }

  registerUser(fRegister: NgForm){
    console.log(this.user);

    this.serviceLogin.postRegisterUser(this.user)
    .subscribe(data=>{
      alert("register successful");
      console.log(data);
      this.serviceLogin.userlogin(this.user.userEmail, this.user.userPass)
      .subscribe(data=>{
        console.log("entro aqui o no?");
        console.log(data);
            let navigateParameter = data[0].userId;
            let userName = data[0].userName;
            let userLastName = data[0].userLastName;

            console.log("return parameter");
            console.log(userName + userLastName);
            console.log(navigateParameter);
            this.navCtrl.navigateRoot('/main/tabs/events', { animated:true });
      },
       error =>{
        this.presentAlert("User and Password Incorrect, please try again");
       });
      //this.showRegister();
      //fRegister.reset();

      
    },
    error =>{
     this.presentAlert("this email already exists, please tray with another");
     fRegister.reset();
    });


  }

}
