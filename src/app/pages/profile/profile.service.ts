import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UserEventNum, UserFollowersNumber, UserProfile } from 'src/app/interfaces/user-profile';
import { EventDetails, EventProfileUser } from 'src/app/interfaces/event';
import { b2bUserModel } from 'src/app/models/b2b-user-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url = 'https://domappssuiteservices.com/B2B/WebServices/';
  constructor(private http: HttpClient,
              private fileTransfer: FileTransfer) { }

    getUserProfileDetails(userId:string){
      let params1 = new HttpParams().set('userId', userId);
      return this.http.get<b2bUserModel[]>(`${this.url}GetUserProfileDetails.php`,{params: params1})
    }

    getUserContacts(userId:string){
      let params1 = new HttpParams().set('userId', userId);
      return this.http.get<b2bUserModel[]>(`${this.url}GetUserContactsDetails.php`,{params: params1})
 
    }

    postUpdateProfile(updateProfile: b2bUserModel){
      return this.http.post(`${this.url}PostUpdateProfile.php`, updateProfile,  {responseType: 'text'} );
    }
              
     
    
    //-------------------------
  getUserProfileInfo(userId: string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<UserModel[]>(`${this.url}GetScheduleUserEvents.php`,{params: params1})
  }



  getUserProfileEventsDetails(userId:string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<EventProfileUser[]>(`${this.url}GetUserProfileEventsDetails.php`,{params: params1})
  }
  getUserFollowers(userId:string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<UserFollowersNumber>(`${this.url}GetFollowersUser.php`,{params: params1})
  }

  getEventUserNum(userId:string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<UserEventNum>(`${this.url}GetEventsUserNum.php`,{params: params1})
  }

  getUserFavEvent(userId:string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<EventDetails[]>(`${this.url}GetUserFavEvents.php`,{params: params1})
  }

  getCheckUserFollow(userFollowerId: string, userFollowedId: string){
    let params1 = new HttpParams().set('userFollowerId', userFollowerId).set('userFollowedId', userFollowedId);
    return this.http.get(`${this.url}GetCheckUserFollow.php`,{params: params1})
  }



}
