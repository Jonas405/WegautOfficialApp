import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFollowersDetailsPage } from './modal-followers-details.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFollowersDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFollowersDetailsPageRoutingModule {}
