import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RestApiService } from '../rest-api.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.page.html',
  styleUrls: ['./launch.page.scss'],
})
export class LaunchPage implements OnInit {
  public userInfo;
  public step = 'wall';
  constructor(
    private authService: AuthService,
    private plt: Platform,
    private api: RestApiService,
    private router: Router) {
     // this.plt.ready().then(() => {
        this.loadUserInfo();
     // });
  }
  loadUserInfo() {
    this.authService.getUserInfo().then(items => {
      this.userInfo = items;
      console.log(this.userInfo);
      if (this.userInfo === null) {
        this.router.navigateByUrl('/login');
      }
    });
  }
  ngOnInit() {
    // console.log('ngoninit');
    // console.log(this.userInfo);
    // console.log(this.userInfo.bg_user_id);
  }
  selectPageType(pageType) {
    this.step = pageType;
  }
  wallPage() {
    const userid = this.userInfo.bg_user_id;
    const body = new FormData();
    body.append('pagetype', this.step);
    body.append('userid', userid);
    console.log(userid);
    this.router.navigateByUrl('/wall');
    this.api.postData('api/updateinfo', body).subscribe(result => {
      const res: any = result;
      if (res !== undefined) {
        if (res[0].status === 'success') {
          if (this.step === 'shopping') {
            this.router.navigateByUrl('/products');
          } else if (this.step === 'service') {
            this.router.navigateByUrl('/services');
          } else {
            this.router.navigateByUrl('/wall');
          }
        } else {
        }
      }
    }, err => {
      console.log(err);
    });
    this.router.navigateByUrl('/wall');
  }

}
