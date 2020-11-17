import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPhotoEventPage } from './modal-photo-event.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPhotoEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPhotoEventPageRoutingModule {}
