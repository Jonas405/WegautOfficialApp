import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFavEventUserPageRoutingModule } from './modal-fav-event-user-routing.module';

import { ModalFavEventUserPage } from './modal-fav-event-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFavEventUserPageRoutingModule
  ],
  declarations: [ModalFavEventUserPage]
})
export class ModalFavEventUserPageModule {}
