import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPhotoEventPageRoutingModule } from './modal-photo-event-routing.module';

import { ModalPhotoEventPage } from './modal-photo-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPhotoEventPageRoutingModule
  ],
  declarations: [ModalPhotoEventPage]
})
export class ModalPhotoEventPageModule {}
