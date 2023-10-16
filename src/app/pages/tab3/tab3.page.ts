import { Component } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor( private androidPermissions:  AndroidPermissions) {}

  ngOnInit() {

    Camera.checkPermissions();

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

  async takePhoto(){
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;
    
      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
    };
}

