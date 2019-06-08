import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginHeaderComponent } from '../share-module/login-header/login-header.component';
import { AuthService } from '../auth/auth.service';
import { RestApiService } from '../rest-api.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import * as _ from 'underscore';
import { Form } from 'ionic-angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  providers: [AuthService, FileChooser, FileTransfer]
})
export class AccountPage implements OnInit {

  public userInfo: any;
  public title: string;
  public userData: any;
  public professions: any;
  public countries: any[] = [];
  public states: any;
  public cities: any;
  public validCities: any;
  public validStates: any;

  public formError: string;
  validations_form: FormGroup;
  validations_postform: FormGroup;
  public imageData;
  public base64Image: any = '';
  public selectedCodeValue: any;

  validation_messages = {
    'postcomments': [
      { type: 'required', message: 'Comments is required.' },
    ],
    'title': [
      { type: 'required', message: 'Title is required.' },
    ],
    'description': [
      { type: 'required', message: 'Description is required.' },
    ]
  };

  @ViewChild('fileInput') fileInput;

  constructor(public loadingController: LoadingController,
    private api: RestApiService,
    public authService: AuthService,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private transfer: FileTransfer,
   // private file: File,
    private fileChooser: FileChooser,
    public camera: Camera,
    ) { }

  ngOnInit() {
    this.title = 'My profile';
    this.authService.getUserInfo().then(items => {
      this.userInfo = items;
      this.fetchUserInfo();
    });
    this.presentLoadingWithOptions();
    this.validations_form = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      customer_phone: new FormControl('', Validators.compose([
        Validators.required
      ])),
      /*address_line1: new FormControl('', Validators.compose([
        Validators.required
      ])),
      postal_code: new FormControl('', Validators.compose([
        Validators.required
      ])),*/
      last_name: new FormControl(),
      customer_birthdate: new FormControl(),
      address_line2: new FormControl(),
      customer_notes: new FormControl(),
      customer_places_visted: new FormControl(),
      customer_places_tovist: new FormControl(),
      customer_account_no: new FormControl(),
      customer_account_holder_name: new FormControl(),
      customer_ifsc_code: new FormControl(),
      customer_gst_no: new FormControl(),
      customer_school: new FormControl(),
      customer_college: new FormControl(),
      customer_college_higher: new FormControl(),
      customer_position: new FormControl(),
      customer_current_company: new FormControl(),
      customer_previous_company: new FormControl(),
      customer_facebook_link: new FormControl(),
      customer_instagram_link: new FormControl(),
      customer_twitter_link: new FormControl(),
      customer_youtube_link: new FormControl(),
      customer_linkedin_link: new FormControl(),
      customer_hobbies: new FormControl(),
      customer_fav_color: new FormControl(),
      customer_fav_place: new FormControl(),
      customer_fav_food: new FormControl(),
      customer_fav_brand: new FormControl(),
      customer_fav_music: new FormControl(),
      customer_fav_book: new FormControl(),
      customer_fav_author: new FormControl(),
      customer_fav_drink: new FormControl(),
      customer_fav_things: new FormControl(),
      customer_fav_sports: new FormControl(),
      customer_fav_celebrates: new FormControl(),
      customer_fav_movie: new FormControl(),
      customer_bucket_list: new FormControl(),
      customer_country: new FormControl(),
      customer_state: new FormControl(),
      /*customer_city: new FormControl(),
      customer_profession: new FormControl(),
      customer_gender: new FormControl(),
      customer_maritial_status: new FormControl(),
      customer_nature: new FormControl(),*/
      company_name: new FormControl(),
      business_source: new FormControl(),
      business_website: new FormControl(),
      business_model: new FormControl(),
      business_sector: new FormControl(),
      branches: new FormControl(),
      business_establishment: new FormControl(),
      is_adult_only: new FormControl(),
      customer_pan_no: new FormControl(),
      customer_tin_no: new FormControl(),
      customer_prof_official_phone: new FormControl(),
      customer_prof_official_email: new FormControl(),
      customer_prof_official_website: new FormControl(),
      fax: new FormControl(),
      address: new FormControl()
    });
  }

  fetchUserInfo() {
    this.api.getStaticData('profile/getUserDetails?userid=' + this.userInfo.bg_user_id, []).subscribe(result => {
      const res: any = result;
      if (res !== undefined) {
        if (res[0].status === 'success') {
          this.userData = res[0].data.info;

          if (res[0].data.professions !== '') {
            const prof: any[] = [];
            _.each(res[0].data.professions, function(country, index) {
              prof.push({indexval: index, value: country});
            });
            this.professions = prof;
          }

          this.selectedCodeValue = this.userData.customer_prof_profession;

          this.countries = [];
          if (res[0].data.countries !== '') {
            const count: any[] = [];
            _.each(res[0].data.countries, function(country, index) {
              count.push({indexval: index, value: country});
            });
            this.countries = count;
          }
          console.log(this.professions);
          if (res[0].data.states !== '') {
            const statelist: any[] = [];
            _.each(res[0].data.states, function(state) {
              statelist.push(state);
            });
            this.states = statelist;
          }
          if (res[0].data.cities !== '') {
            const citylist: any[] = [];
            _.each(res[0].data.cities, function(city) {
              citylist.push(city);
            });
            this.cities = citylist;
          }
        } else {
          this.presentToastWithOptions(res[0].msg);
        }
      } else {
        this.presentToastWithOptions('Invalid Request');
      }
      this.loadingController.dismiss();
    });
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
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
      duration: 5000,
      position: 'bottom',
      closeButtonText: 'Done'
    });
    toast.present();
  }

  checkProfession(value) {
    if (this.userData.customer_prof_profession.length > 0) {
      const prof = this.userData.customer_prof_profession;
      const index = _.find(prof, function(profession) { return profession === value; });
      if (index !== undefined) {
        return true;
      } else {
        return false;
      }
    }
  }

  changeProf(data) {
    console.log(data);
  }

  changeCountry(data) {
    console.log(data);
    
    const currentCountry = data.detail.value;
    this.validStates = [];
    const statelist: any[] = [];
    _.each(this.states, function(state: any) {
      if (state.countryid === currentCountry) {
        statelist.push({key: state.id, value: state.name});
      }
    });
    this.validStates = statelist;
    console.log(this.validStates);
  }

  changeState(data) {
    const currentState = data.detail.value;
    this.validCities = [];
    const citylist: any[] = [];
    _.each(this.cities, function(city: any) {
      if (city.stateid === currentState) {
        citylist.push({key: city.id, value: city.name});
      }
    });
    this.validCities = citylist;
  }

  updateProfile(formValues) {
    const body = new FormData();
    _.each(formValues, function(val: any, key: any) {
      body.append(key, val);
    });
    body.append('user_id', this.userInfo.bg_user_id);
    this.api.postData('profile/updateInfo', body).subscribe(result => {
      const res: any = result;
      let message = '';
      if (res !== undefined) {
        if (res[0].status === 'success') {
          message = 'Profile updated successfully';
        } else {
          this.formError = res[0].error;
          message = 'Please provide proper details';
        }
      } else {
        message = 'Something went Wrong, Try again later';
      }
      this.presentToastWithOptions(message);
    });
  }

}
