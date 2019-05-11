import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { NavController, ActionSheetController , NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, LoadingController  } from '@ionic/angular';
// import { DatePicker } from '@ionic-native/date-picker/ngx';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public toggleAction = false;
  public formError: string;
  validations_form: FormGroup;
  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'companyname': [
      { type: 'minlength', message: 'Company Name must be at least 1 characters long.' },
      { type: 'maxlength', message: 'Company Name cannot be more than 25 characters long.' },
      { type: 'validCompanyname', message: 'Your company name has already been taken.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'email': [
      { type: 'required', message: 'EmailId is required.' },
      { type: 'pattern', message: 'Invalid Email' },
      { type: 'validEmail', message: 'Your Email has already been taken.' }
    ],
    'firstname': [
      { type: 'required', message: 'Firstname is required.' },
    ],
  };
  base64Image: any = '';
  image: any = '';
  DefaultImg = 'assets/kola.jpg';
  loading: any;
  @ViewChild('fileInput') fileInput;

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private api: RestApiService,
    public formBuilder: FormBuilder,
   // private datePicker: DatePicker,
    private  router:  Router) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      companyname: new FormControl( ''),
      lastname: new FormControl( '', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(1)
      ])),
      dob: new FormControl( ''),
      gender: new FormControl( ''),
      usertype: new FormControl(''),
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  userTypeToggle() {
    console.log(this.validations_form.value.usertype);
    if (this.validations_form.value.usertype === false) {
      this.toggleAction = true;
    } else if (this.validations_form.value.usertype === true) {
      this.toggleAction = false;
    }
  }

  register(form) {
    console.log(form);
    const body = new FormData();
    body.append('customer_first_name', form.firstname);
    body.append('customer_last_name', form.lastname);
    body.append('customer_username', form.username);
    body.append('customer_email', form.email);
    body.append('customer_password', form.password);
    body.append('dob', form.dob);
    body.append('gender', form.gender);
    body.append('customer_type', form.usertype);
    body.append('customer_photo', this.base64Image);
    body.append('company_name', form.companyname);
    this.showLoader();
    this.api.postData('api/register', body).subscribe(result => {
      console.log('innn');
      const res: any = result;
      if (res !== undefined) {
        console.log(res.status);
        if (res.status === 'success') {
          this.presentToastWithOptions(res.message);
          // this.router.navigateByUrl('/login');
        } else {
          
          this.formError = res[0].message;
          console.log(this.formError);
        }
      }
    }, err => {
      console.log(err);
    });
  }

  async showLoader() {
    const loading = await this.loadingCtrl.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }




  async presentToastWithOptions(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Done'
    });
    toast.present();
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
