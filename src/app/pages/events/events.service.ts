import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { EventDetails,EventSheduleDetails} from 'src/app/interfaces/event';
import { EventModel } from 'src/app/models/event-model';
import { EventLike, ScheduleUserEvent } from 'src/app/models/schedule-user-event-models';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  pageEvent = 0;

  url = 'https://domappssuiteservices.com/Wegaut2020/WegautAppWebServices/';

  constructor(private http: HttpClient, private fileTransfer: FileTransfer) { }

  getEventsDetails(pull: boolean = false){
    if(pull){
      this.pageEvent = 0;
    }
    this.pageEvent ++;
    return this.http.get<EventDetails[]>(`${this.url}GetEventDetails.php/?page=${ this.pageEvent }`);
   // let params1 = new HttpParams().set('page',this.pageEvent.toString());
   // return this.http.get<EventDetails[]>(`${this.url}GetEventDetails.php`,{params:params1});
  }

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
    return this.http.post(`${this.url}PostNewEvent.php`, newEvent,  {responseType: 'text'} );
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
