import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalNewEventPageRoutingModule } from './modal-new-event-routing.module';
import { ModalNewEventPage } from './modal-new-event.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ModalNewEventPageRoutingModule
  ],
  declarations: [ModalNewEventPage]
})
export class ModalNewEventPageModule {}
