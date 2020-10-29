import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      {
        path: 'home',
        children:[{
          path:'',
          loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
        }]
      },
      {
        path: 'auth',
        children:[{
          path:'',
          loadChildren: () => import('../auth/auth.module').then( m => m.AuthPageModule)
        }]
      },
      {
        path: 'profile',
        children:[{
          path:'',
          loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
        }]
      },
      {
        path: 'notification',
        children:[{
          path:'',
          loadChildren: () => import('../notification/notification.module').then( m => m.NotificationPageModule)
        }]
      },
      {
        path: 'events',
        children:[{
          path:'',
          loadChildren: () => import('../events/events.module').then( m => m.EventsPageModule)
        }]
      }
]}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
