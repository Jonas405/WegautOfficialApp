import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFollowersDetailsPageRoutingModule } from './modal-followers-details-routing.module';

import { ModalFollowersDetailsPage } from './modal-followers-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFollowersDetailsPageRoutingModule
  ],
  declarations: [ModalFollowersDetailsPage]
})
export class ModalFollowersDetailsPageModule {}
