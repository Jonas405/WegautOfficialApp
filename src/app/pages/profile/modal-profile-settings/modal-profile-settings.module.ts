import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalProfileSettingsPageRoutingModule } from './modal-profile-settings-routing.module';

import { ModalProfileSettingsPage } from './modal-profile-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalProfileSettingsPageRoutingModule
  ],
  declarations: [ModalProfileSettingsPage]
})
export class ModalProfileSettingsPageModule {}
