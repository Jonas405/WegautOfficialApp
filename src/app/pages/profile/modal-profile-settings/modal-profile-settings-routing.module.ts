import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalProfileSettingsPage } from './modal-profile-settings.page';

const routes: Routes = [
  {
    path: '',
    component: ModalProfileSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalProfileSettingsPageRoutingModule {}
