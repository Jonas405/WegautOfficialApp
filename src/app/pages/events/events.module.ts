import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { ModalScheduleEventPageModule } from './modal-schedule-event/modal-schedule-event.module';
import { ModalScheduleEventPage } from './modal-schedule-event/modal-schedule-event.page';
import { ModalNewEventPageModule } from './modal-new-event/modal-new-event.module';
import { ModalNewEventPage } from './modal-new-event/modal-new-event.page';

import { Camera, CameraOptions} from '@ionic-native/camera/ngx'
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  entryComponents:[
    ModalScheduleEventPage,
    ModalNewEventPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    EventsPageRoutingModule,
    ModalScheduleEventPageModule,
    ModalNewEventPageModule
  ],
  providers:[Camera],
  declarations: [EventsPage]
})
export class EventsPageModule {}
