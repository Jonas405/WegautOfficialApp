import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetailsEventPage } from './modal-details-event.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetailsEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetailsEventPageRoutingModule {}
