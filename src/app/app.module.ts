import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { LoginHeaderComponent } from './login-header/login-header.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from './auth/auth.service';
import { IonicStorageModule  } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { ShareModulePageModule } from './share-module/share-module.module';
// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@NgModule({
  declarations: [
  AppComponent,
],
  entryComponents: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    ShareModulePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Camera,
    // YoutubeVideoPlayer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
