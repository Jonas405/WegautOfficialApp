import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFollowUsersPage } from './modal-follow-users.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFollowUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFollowUsersPageRoutingModule {}
