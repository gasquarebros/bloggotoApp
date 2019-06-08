import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

import { LoginHeaderComponent } from '../share-module/login-header/login-header.component';
import { CommonPostComponent } from '../share-module/common-post/common-post.component';
import { CommonServicesComponent } from '../share-module/common-services/common-services.component';
import { CommonProductsComponent } from '../share-module/common-products/common-products.component';
import { CommonFooterComponent } from '../share-module/common-footer/common-footer.component';
import { AuthService } from '../auth/auth.service';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [AuthService]
})
export class ProfilePage implements OnInit {

  public title: string;
  public customerType: string;
  public postData: any;
  public userInfo: any;
  public profileInfo: any;
  public posts: any;
  public nextOffset: any;
  public profileType: string;
  public profileView: string;
  public like_btn: any = {'icon_name' : 'heart', 'color': 'danger' };

  public loop: boolean = true;

  @ViewChild(CommonPostComponent)
  public commonPostComponent: CommonPostComponent;

  constructor(
    public loadingController: LoadingController,
    private api: RestApiService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public toastCtrl: ToastController) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.title = '';
    this.customerType = '';
    this.nextOffset = 0;
    this.profileType = '';
    this.authService.getUserInfo().then(items => {
      this.userInfo = items;
      if (queryParams !== undefined && queryParams.customer != undefined && queryParams.customer != '') {
        this.fetchProfileInfo(queryParams.customer);
      } else {
        this.fetchProfileInfo(this.userInfo.customer_username);
      }
    });
    this.presentLoadingWithOptions();
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

  fetchProfileInfo(userName) {
    this.api.getStaticData('profile/getDetails?userid=' + userName + '&customerid=' + this.userInfo.bg_user_id, []).subscribe(result => {
      const res: any = result;
      if (res !== undefined) {
        if (res[0].status === 'success') {
          this.profileInfo = res[0].data;
          this.title = '#' + this.profileInfo.info.customer_username;
          this.customerType = (this.profileInfo.info.customer_type === 0) ? 'Personal' : 'Business';
          this.profileView = 'post';
          if (this.profileInfo.follow_list.length > 0) {
            const index = _.findIndex(this.profileInfo.follow_list, this.profileInfo.info.customer_id);
            if (index >= 0) {
              this.loop = false;
            }
          }

        }
        this.loadingController.dismiss();
      }
    }, err => {
      console.log(err);
    });
  }

  profileSection(section = '') {
    this.profileView = 'post';
    this.profileType = section;
  }

  profileViewSection(viewType) {
    this.profileView = viewType;
  }

  createPost() {
    this.commonPostComponent.createPost();
  }

  loopUser(event) {
    const body = new FormData();
    body.append('customerid', this.userInfo.bg_user_id);
    body.append('userid', this.profileInfo.info.customer_id);
    this.api.postData('profile/userFollow', body).subscribe(result => {
      const res: any = result;
      if (res !== undefined) {
        if (res[0].status === 'success') {
          this.profileInfo.follow_count = res[0].profile_following_html;
          this.profileInfo.following_count = res[0].profile_html;
          if (event === 'follow') {
            this.loop = false;
          } else {
            this.loop = true;
          }
        }
        this.presentToastWithOptions(res[0].msg);
      }
    });
  }

}
