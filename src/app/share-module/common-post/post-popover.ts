import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController, NavParams, ModalController } from '@ionic/angular';
import { RestApiService } from '../../rest-api.service';

import { ModelPostComponent } from '../model-post/model-post.component';

@Component({
  template: `
    <ion-list>
      <button style="width: 42%;margin: 0 auto;margin-right: 10px;background: #ccc;text-align: center;padding: 10px; margin-left: 10px;"
      ion-item *ngIf="userInfo.bg_user_id != postData.post_created_by" (click)="report()">Report</button>
      <button style="width: 42%;margin: 0 auto;margin-right: 10px;background: #ccc;text-align: center;padding: 10px; margin-left: 10px;"
      ion-item *ngIf="userInfo.bg_user_id == postData.post_created_by" (click)="editPost(postData)">Edit Post</button>
      <button style="width: 42%;margin: 0 auto;margin-right: 10px;background: #ccc;text-align: center;padding: 10px; margin-left: 10px;"
      ion-item *ngIf="userInfo.bg_user_id == postData.post_created_by" (click)="delete()">Delete Post</button>
    </ion-list>
  `
})
export class PostPopover implements OnInit {

  public userInfo;
  public postData;
  public postCategories: any = [];
  public postTypes: any = [];
  public followers: any = [];
  public reqOpts;

  constructor( public navParams: NavParams,
    public popoverController: PopoverController,
    private api: RestApiService,
    public modalController: ModalController,
    public toastCtrl: ToastController) {}

  ngOnInit() {
    this.postData = this.navParams.data.post;
    this.userInfo = this.navParams.data.userInfo;
    this.getPostCategories();
    this.getTagBloggotians();
  }
  close() {
    this.popoverController.dismiss();
  }

  report() {
    const body = new FormData();
    body.append('post_id', this.postData.post_id);
    body.append('user_id', this.userInfo.bg_user_id);
    this.api.postData('post/postReport', body).subscribe(result => {
      const res: any = result;
      if (res !== undefined) {
        if (res[0].status === 'success') {
          this.presentToast(res[0].message);
          this.close();
        } else {
          this.presentToast(res[0].message);
        }
      }
    }, err => {
      console.log(err);
    });
  }

  getPostCategories() {
    this.api.getStaticData('post/blog_category?app_id=bloggoto_app_123456', this.reqOpts).subscribe(result => {
      const res: any = result;
      console.log(res);
      this.postCategories = res[0].category;
      this.postTypes = res[0].post_types;
      console.log(this.postTypes);
    });
  }

  getTagBloggotians() {
    const body = new FormData();
    body.append('user_id', this.userInfo.bg_user_id);
    this.api.postData('post/followers_list', body).subscribe(result => {
      const res: any = result;
      if (res !== undefined) {
        this.followers = res[0].followers;
      }
    });
  }

  async editPost(postData) {
      const modal = await this.modalController.create({
        component: ModelPostComponent,
        componentProps: {
          'type': 'post',
          'post': postData,
          'postCategories': this.postCategories,
          'postTypes': this.postTypes,
          'userInfo': this.userInfo,
          'followers': this.followers
        }
      });
      return await modal.present();
  }

  delete() {
    const body = new FormData();
    body.append('post_id', this.postData.post_id);
    body.append('user_id', this.userInfo.bg_user_id);
    this.api.postData('post/postDelete', body).subscribe(result => {
      const res: any = result;
      if (res !== undefined) {
        if (res[0].status === 'success') {
          this.presentToast(res[0].message);
          this.close();
        } else {
          this.presentToast(res[0].message);
        }
      }
    }, err => {
      console.log(err);
    });
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Done'
    });
    toast.present();
  }
}
