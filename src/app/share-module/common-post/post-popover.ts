import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController, NavParams } from '@ionic/angular';
import { RestApiService } from '../../rest-api.service';

@Component({
  template: `
    <ion-list>
      <button style="width: 42%;margin: 0 auto;margin-right: 10px;background: #ccc;text-align: center;padding: 10px; margin-left: 10px;"
      ion-item (click)="report()">Report</button>
      <button style="width: 42%;margin: 0 auto;margin-right: 10px;background: #ccc;text-align: center;padding: 10px; margin-left: 10px;"
      ion-item *ngIf="userInfo.bg_user_id == postData.post_created_by" (click)="delete()">Delete Post</button>
    </ion-list>
  `
})
export class PostPopover implements OnInit {

  public userInfo;
  public postData;

  constructor( public navParams: NavParams,
    public popoverController: PopoverController,
    private api: RestApiService,
    public toastCtrl: ToastController) {}

  ngOnInit() {
    this.postData = this.navParams.data.post;
    this.userInfo = this.navParams.data.userInfo;
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
