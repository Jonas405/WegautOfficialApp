import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalScheduleEventPage } from './modal-schedule-event.page';

const routes: Routes = [
  {
    path: '',
    component: ModalScheduleEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalScheduleEventPageRoutingModule {}
