import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetailsEventPageRoutingModule } from './modal-details-event-routing.module';

import { ModalDetailsEventPage } from './modal-details-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetailsEventPageRoutingModule
  ],
  declarations: [ModalDetailsEventPage]
})
export class ModalDetailsEventPageModule {}
