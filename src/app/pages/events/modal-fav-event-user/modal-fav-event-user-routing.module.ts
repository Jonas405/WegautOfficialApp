import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFavEventUserPage } from './modal-fav-event-user.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFavEventUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFavEventUserPageRoutingModule {}
