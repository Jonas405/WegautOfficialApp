import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { UserFollow } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'https://domappssuiteservices.com/Wegaut2020/WegautAppWebServices/';
  constructor(private http: HttpClient) { }

  getUserToFollow(userId: string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<UserProfile[]>(`${this.url}GetUserToFollow.php`,{params: params1})
  }

  postFollowUser(userFollow: UserFollow){
    return this.http.post(`${this.url}PostFollowUser.php`, userFollow,  {responseType: 'text'} );
  }

  getFollowersUser(userId: string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<UserProfile[]>(`${this.url}GetFollowersUserDetails.php`,{params: params1})
  }

}
