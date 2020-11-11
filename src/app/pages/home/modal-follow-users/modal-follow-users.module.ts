import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFollowUsersPageRoutingModule } from './modal-follow-users-routing.module';

import { ModalFollowUsersPage } from './modal-follow-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFollowUsersPageRoutingModule
  ],
  declarations: [ModalFollowUsersPage]
})
export class ModalFollowUsersPageModule {}
