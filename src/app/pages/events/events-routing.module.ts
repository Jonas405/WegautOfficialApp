import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  },
  {
    path: 'modal-schedule-event',
    loadChildren: () => import('./modal-schedule-event/modal-schedule-event.module').then( m => m.ModalScheduleEventPageModule)
  },
  {
    path: 'modal-new-event',
    loadChildren: () => import('./modal-new-event/modal-new-event.module').then( m => m.ModalNewEventPageModule)
  },
  {
    path: 'modal-details-event',
    loadChildren: () => import('./modal-details-event/modal-details-event.module').then( m => m.ModalDetailsEventPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
