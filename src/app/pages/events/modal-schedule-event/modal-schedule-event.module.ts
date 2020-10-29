import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalScheduleEventPageRoutingModule } from './modal-schedule-event-routing.module';

import { ModalScheduleEventPage } from './modal-schedule-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalScheduleEventPageRoutingModule
  ],
  declarations: [ModalScheduleEventPage]
})
export class ModalScheduleEventPageModule {}
