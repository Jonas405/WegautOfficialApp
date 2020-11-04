import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetailsProfilePage } from './modal-details-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetailsProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetailsProfilePageRoutingModule {}
