import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { EventComments, EventDetails,EventSheduleDetails, SelectedEventDetails} from 'src/app/interfaces/event';
import { EventModel, EventPhoto } from 'src/app/models/event-model';
import { EventLike, ScheduleUserEvent } from 'src/app/models/schedule-user-event-models';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Observable } from 'rxjs';
import { UserSponsor } from 'src/app/interfaces/userSponsor';
import { UserComment } from 'src/app/models/user-model';
import { b2bChatDirectModel } from 'src/app/models/b2b-chat-direct-model';
import { b2bCreateGroupModel } from 'src/app/models/b2b-create-group-model';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  pageEvent = 0;

  url = 'https://domappssuiteservices.com/B2B/WebServices/';

  constructor(private http: HttpClient, private fileTransfer: FileTransfer) { }

  //get chat messages
  getChatMessagesDirect(pull: boolean = false, idUserOrigin: string, idUserDestiny: string, pageEvent: number){
    let params1 = new HttpParams().set('idUserOrigin', idUserOrigin).set('idUserDestiny', idUserDestiny);
    return this.http.get<b2bChatDirectModel[]>(`${this.url}GetChatMessagesDirect.php/?page=${ pageEvent }`,{params:params1});
  }


  postNewMessageDirect(messageContent: b2bChatDirectModel){
    return this.http.post(`${this.url}PostNewMessageDirect.php`, messageContent,  {responseType: 'text'} );
  }

  //get my chat groups

  getMyGroups(myUserId: string ){
    let params1 = new HttpParams().set('myUserId', myUserId);
    return this.http.get<b2bCreateGroupModel[]>(`${this.url}GetMyGroups.php`,{params:params1});
 
  }

  //post group message
  postNewMessageGroup(messageContent: b2bChatDirectModel){
    return this.http.post(`${this.url}PostNewMessageGroup.php`, messageContent,  {responseType: 'text'} );
 
  }

   getChatMessagesDirectGroup(pull: boolean = false, idUserOrigin: string, idGroupDestiny: string, pageEvent: number){
    let params1 = new HttpParams().set('idUserOrigin', idUserOrigin).set('idGroupDestiny', idGroupDestiny);
    return this.http.get<b2bChatDirectModel[]>(`${this.url}GetChatMessagesGroupsDirect.php/?page=${ pageEvent }`,{params:params1});
  }


  //
/* 
  getEventsDetails(pull: boolean = false){
    if(pull){
    //  this.pageEvent = 0;
    }
  //  this.pageEvent ++;
    return this.http.get<EventDetails[]>(`${this.url}GetEventDetails.php/?page=${ this.pageEvent }`);
   // let params1 = new HttpParams().set('page',this.pageEvent.toString());
   // return this.http.get<EventDetails[]>(`${this.url}GetEventDetails.php`,{params:params1});
  }
 */
  postNewScheduleEvent(scheduleUserEvent: ScheduleUserEvent){
    return this.http.post(`${this.url}PostNewScheduleEvent.php`, scheduleUserEvent,  {responseType: 'text'} );
  }

  getScheduleUserEvent(userId: string){
    let params1 = new HttpParams().set('userId', userId);
    return this.http.get<EventSheduleDetails[]>(`${this.url}GetScheduleUserEvents.php`,{params: params1})
  }

  postNewLikeEvent(likeUserEvent: EventLike){
    return this.http.post(`${this.url}PostNewLikeEvent.php`, likeUserEvent,  {responseType: 'text'} );
  }

  postNewEvent(newEvent: EventModel){
    console.log("from service new event" + newEvent);
    return this.http.post(`${this.url}PostNewEvent.php`, newEvent,  {responseType: 'text'} );
  }

  getAllUserSponsor(userType){
    let params1 = new HttpParams().set('userType', userType);
    return this.http.get<UserSponsor[]>(`${this.url}GetUsersSponsor.php`,{params: params1})
  }

  getDetailsEventId(eventId){
    let params1 = new HttpParams().set('eventId', eventId);
    return this.http.get<SelectedEventDetails[]>(`${this.url}GetDetailsSelectedEvent.php`,{params: params1})
  }

  getSponsorOnSelectedEvent(eventId){
    let params1 = new HttpParams().set('eventId', eventId);
    return this.http.get<UserSponsor[]>(`${this.url}GetSponsorOnSelectedEvent.php`,{params: params1})
  }

  getCommentsEvent(eventId){
    let params1 = new HttpParams().set('eventId', eventId);
    return this.http.get<EventComments[]>(`${this.url}GetCommentsEvent.php`,{params: params1})
  }

  postCommentEvent(userComment: UserComment){
    return this.http.post(`${this.url}PostCommentEvent.php`, userComment,  {responseType: 'text'} );
  }

  postPhotoEvent(photoEvent: EventPhoto){
    return this.http.post(`${this.url}PostNewPhotoEventUser.php`, photoEvent,  {responseType: 'text'} );
  }

  getPhotoEvent(eventId){
    let params1 = new HttpParams().set('eventId', eventId);
    return this.http.get<EventPhoto[]>(`${this.url}GetPhotosEvent.php`,{params: params1})
  }

/* 
  //upload image selected or take photo
  uploadImage(imgUrl:string){
    const option: FileUploadOptions = {
      fileKey:'image'
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(imgUrl,`${this.url}PostNewEventImg.php`,option)
    .then(data=>{
      console.log(data);
      alert("sucess");
    }).catch(err =>{
      console.log('error uploading', err);
      alert("error"+JSON.stringify(err));
    });
  } */


}
