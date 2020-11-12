import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationDetails } from 'src/app/interfaces/notification';
import { NotificationModel } from 'src/app/models/notification-model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  url = 'https://domappssuiteservices.com/Wegaut2020/WegautAppWebServices/';
  constructor(private http: HttpClient) { }


  getNotificationUser(userId: string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<NotificationDetails[]>(`${this.url}GetNotificationUser.php`,{params: params1})
  }

  postNotification(notification: NotificationModel){
    return this.http.post(`${this.url}PostNotificationUser.php`, notification,  {responseType: 'text'} );
  }

}
