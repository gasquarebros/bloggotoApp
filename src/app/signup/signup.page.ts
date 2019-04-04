import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService } from '../auth/auth.service';
// import { NavController, ActionSheetController , NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  base64Image: any = '';
  image: any = '';
  DefaultImg = 'assets/icon/DefaultPic.jpg';
  loading: any;
  @ViewChild('fileInput') fileInput;

  constructor(
    // private toastCtrl: ToastController,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private  router:  Router) { }

  ngOnInit() {
  }

  register(form) {
    this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }

  showLoader() {
    /*this.loading = this.loadingCtrl.create({
        content: 'Adding...'
    });

    this.loading.present();*/
  }

  presentToast(msg) {
    /* const toast = this.toastCtrl.create({
      message: msg,
      duration: 8000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present(); */
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      // title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

takePicture(sourceType) {
  // Create options for the Camera Dialog
const options: CameraOptions = {
  sourceType: sourceType,
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  targetWidth: 600,
  targetHeight: 600,
  saveToPhotoAlbum: false
};

if (Camera['installed']) {
this.camera.getPicture(options).then((imageData) => {
   this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
    try {
    this.fileInput.nativeElement.click();
    } catch (err) {
    console.log(err);
    // this.presentToast('Sorry!! Something went wrong.');
    }
  });
   } else {
  this.fileInput.nativeElement.click();
  }
}

 processWebImage(event) {
 console.log(event);

    const reader = new FileReader();
    reader.onload = (readerEvent) => {

      const ImageURI = (readerEvent.target as any).result;
      this.base64Image = ImageURI;
    };

   reader.readAsDataURL(event.target.files[0]);
  }

  openCam() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     // alert(imageData)
     this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
     // Handle error
     alert('error ' + JSON.stringify(err));
    });

  }

}
