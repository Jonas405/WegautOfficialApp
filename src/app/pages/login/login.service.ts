import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  idUserFromDb: string = null;

  redirectUrl: string;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  url = 'https://domappssuiteservices.com/B2B/WebServices/';

  constructor(private http: HttpClient,
              private storage: Storage,
              private navCtrl: NavController) { }

  postRegisterUser(registerUser: UserModel){
    return this.http.post(`${this.url}PostRegisterUser.php`, registerUser,  {responseType: 'text'} );
  }

  postRegisterEnterpriseUser(registerUser: UserModel){
    return this.http.post(`${this.url}PostRegisterEnterpriseUser.php`, registerUser,  {responseType: 'text'} );
  }

  userlogin(userEmail, userPass) {
    
    return this.http.post(`${this.url}PostLoginUser.php`, {userEmail,userPass},  {responseType: 'json'} )
    .pipe(map((resp:any) => {
      this.setToken(resp[0].siteStoreId);
      console.log( this.setToken(resp[0].siteStoreId))
      this.getLoggedInName.emit(true);
      console.log("resp");
      console.log(resp[0].userId);

      if(resp[0].userId != null){
          this.saveIdUser(resp[0].userId);
      }else{
        resp[0].userId = null;
        this.storage.clear();
      }
      return resp;
      }
    ));
    }

    //Save token in storage
    async saveIdUser(idUserFromDb: string){
      this.idUserFromDb = idUserFromDb;
      await this.storage.set('idUserFromDb', idUserFromDb);

      this.getIdUserFromDbStorage();
    } 

    getIdUserFromDbStorage(){
        this.storage.get('idUserFromDb').then((val)=>{
          if(val != null ){
            console.log('Your id from db storage is ', val);
          }else{
            this.navCtrl.navigateRoot('/login');
          }
        })
      
        
    }

/* 
    //IdUser validator with storage ionic
    async uploadStorageIdUserFromDB(){
      this.idUserFromDb = await this.storage.get('idUserFromDb') || null;
    }

    //Check if iduser exitst in storage
    async validateIdUser(): Promise<boolean>{
      await this.uploadStorageIdUserFromDB();
      
      //if no extis the iduser in the storage go out
      if( !this.idUserFromDb){
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve(false);
      }
    } */

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
    }
    getToken() {
    return localStorage.getItem('token');
    }
    deleteToken() {
    localStorage.removeItem('token');
    }
    isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
    return true
    }
    return false;
    }


}
