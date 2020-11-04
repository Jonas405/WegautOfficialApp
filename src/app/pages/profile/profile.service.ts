import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { EventProfileUser } from 'src/app/interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url = 'https://domappssuiteservices.com/Wegaut2020/WegautAppWebServices/';
  constructor(private http: HttpClient,
              private fileTransfer: FileTransfer) { }


  getUserProfileInfo(userId: string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<UserModel[]>(`${this.url}GetScheduleUserEvents.php`,{params: params1})
  }


  getUserProfileDetails(userId:string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<UserProfile[]>(`${this.url}GetUserProfileDetails.php`,{params: params1})
  }

  getUserProfileEventsDetails(userId:string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<EventProfileUser[]>(`${this.url}GetUserProfileEventsDetails.php`,{params: params1})
  }
  
}
