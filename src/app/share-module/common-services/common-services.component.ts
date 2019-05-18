import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { RestApiService } from 'src/app/rest-api.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-common-services',
  templateUrl: './common-services.component.html',
  styleUrls: ['./common-services.component.scss'],
  providers: [AuthService]
})
export class CommonServicesComponent implements OnInit {


  @Input()
  public profileInfo: any;

  @Input()
  public profileView = false;

  public posts: any;
  public nextOffset: any;

  constructor(public loadingController: LoadingController,
    private api: RestApiService,
    public authService: AuthService,
    public toastCtrl: ToastController) { }

  ngOnInit() {
    this.presentLoadingWithOptions();
    this.fetchservices();
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

  fetchservices(nextOffset = 0) {
    this.api.getStaticData('profile/viewServices?userid=' + this.profileInfo.info.customer_id + '&offset = ' + nextOffset, []
    ).subscribe(result => {
      const response: any = result;
      if (response !== undefined) {
        if (nextOffset > 0) {
          this.nextOffset = response[0].data.next_set;
          const morePosts = response[0].data.records;
          this.posts = this.posts.concat(morePosts);
        } else {
          this.posts = response[0].data.records;
          this.nextOffset = response[0].data.next_set;
        }
      }
      this.loadingController.dismiss();
    });
  }

  ionRefresh(event, offset) {
    if (offset !== '') {
      if (offset !== undefined) {
        this.nextOffset = offset;
        this.fetchservices(offset);
      } else {
        this.fetchservices();
      }
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    } else {
      event.target.complete();
    }
  }
  ionPull(event) {
    console.log('ionPull Event Triggered!');
  }
  ionStart(event) {
    console.log('ionStart Event Triggered!');
  }

}
