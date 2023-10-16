import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    PagesModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AndroidPermissions],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor( private androidPermissions:  AndroidPermissions) {}

  ngOnInit() {

    //Camera.checkPermissions();

    this.androidPermissions.PERMISSION.CAMERA,
    this.androidPermissions.PERMISSION.INTERNET,
    this.androidPermissions.PERMISSION.GET_ACCOUNTS,
    this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.READ_PRIVILEGED_STATE,
    this.androidPermissions.PERMISSION.READ_MEDIA_IMAGES,


    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    
  }
}

