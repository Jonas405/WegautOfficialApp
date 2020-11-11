import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http'
import { Camera} from '@ionic-native/camera/ngx';
import { ImageSanitizerPipe } from './pipes/image-sanitizer.pipe'
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { CountdownModule } from 'ngx-countdown';
import {AutosizeModule} from 'ngx-autosize';


@NgModule({
  declarations: [AppComponent, ImageSanitizerPipe],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(),
            IonicStorageModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,
            CountdownModule,
            AutosizeModule
            ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
