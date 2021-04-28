import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationDetails } from 'src/app/interfaces/notification';
import { b2bAddContact } from 'src/app/models/b2b-add-contact-model';
import { b2bCreateGroupModel } from 'src/app/models/b2b-create-group-model';
import { b2bUserModel } from 'src/app/models/b2b-user-model';
import { NotificationModel } from 'src/app/models/notification-model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  url = 'https://domappssuiteservices.com/B2B/WebServices/';
  constructor(private http: HttpClient) { }


  getNewContacts(userId: string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<b2bUserModel[]>(`${this.url}GetNewUserContacts.php`,{params: params1})
  }

  postAddNewContact(addContact: b2bAddContact){
    return this.http.post(`${this.url}PostAddNewContact.php`, addContact,  {responseType: 'text'} );

  }

  postAddNewGroup(addNewGroup: b2bCreateGroupModel){
    return this.http.post(`${this.url}PostAddNewGroup.php`, addNewGroup,  {responseType: 'text'} );

  }

  //------------

  getNotificationUser(userId: string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<NotificationDetails[]>(`${this.url}GetNotificationUser.php`,{params: params1})
  }

  postNotification(notification: NotificationModel){
    return this.http.post(`${this.url}PostNotificationUser.php`, notification,  {responseType: 'text'} );
  }

}
