import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetailsProfilePageRoutingModule } from './modal-details-profile-routing.module';

import { ModalDetailsProfilePage } from './modal-details-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetailsProfilePageRoutingModule
  ],
  declarations: [ModalDetailsProfilePage]
})
export class ModalDetailsProfilePageModule {}
