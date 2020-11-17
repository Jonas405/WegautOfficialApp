import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'modal-details-profile',
    loadChildren: () => import('./modal-details-profile/modal-details-profile.module').then( m => m.ModalDetailsProfilePageModule)
  },
  {
    path: 'modal-followers-details',
    loadChildren: () => import('./modal-followers-details/modal-followers-details.module').then( m => m.ModalFollowersDetailsPageModule)
  },
  {
    path: 'modal-followers-details',
    loadChildren: () => import('./modal-followers-details/modal-followers-details.module').then( m => m.ModalFollowersDetailsPageModule)
  },
  {
    path: 'modal-profile-settings',
    loadChildren: () => import('./modal-profile-settings/modal-profile-settings.module').then( m => m.ModalProfileSettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
