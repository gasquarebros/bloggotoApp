import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthService, Events]
})
export class LoginPage implements OnInit {
  public formError: string;
  validations_form: FormGroup;
  validation_messages = {
    'username': [
      { type: 'required', message: 'EmailId/Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
  };
  constructor(
    public formBuilder: FormBuilder,
    public api: RestApiService,
    private authService: AuthService,
    private storage: Storage,
    public events: Events,
    public myApp: AppComponent,
    private router: Router) {
  }

  ngOnInit() {
      this.validations_form = this.formBuilder.group({
        username: new FormControl('', Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[@0-9])[a-zA-Z0-9]+$'),
          Validators.required
        ])),
        password: new FormControl('', Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.required
        ])),
      });

      this.authService.getUserInfo().then(items => {
        const userInfo = items;
        console.log('login info');
        console.log(userInfo);
        if (userInfo !== null) {
          this.router.navigateByUrl('/launch');
        }
      });
  }

  launchPage(values) {
    this.formError = '';
    const body = new FormData();
    body.append('username', values.username);
    body.append('password', values.password);
    this.api.postData('api/login', body).subscribe(result => {
      const res: any = result;
      if (res !== undefined) {
        if (res[0].status === 'success') {
          this.storage.set('ACCESS_TOKEN', res[0].user_data.access_token);
          this.storage.set('USER_DATA', res[0].user_data);
          this.events.publish('user:login');
          this.myApp.loggedIn();
          this.router.navigateByUrl('/launch');
        } else {
          this.formError = res[0].message;
        }
      }
    }, err => {
      console.log(err);
    });
    /*this.storage.set('ACCESS_TOKEN', 'asdhsadusa-asdasdsad-adasd-sadasda');
    this.storage.set('USER_DATA', {"bg_user_id": "12",
    "bg_first_name": "GA",
    "bg_last_name": "squarebros",
    "bg_user_group": "writer",
    "bg_user_type": "0",
    "company_name": "",
    "customer_username": "gasquarebros",
    "access_token": "bWeL09463cTutvZo",
    "bg_user_profile_picture": "https://www.bloggoto.com/media/customers//23327dcc89fa92683f31464b8f08adc0.jpg"});
    
    this.router.navigateByUrl('/launch');*/
  }
  OpenSignup() {
    this.router.navigateByUrl('/signup');
  }

}
