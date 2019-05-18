import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MenuController, PopoverController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';
import { RestApiService } from '../../rest-api.service';
import { ModelPostComponent } from '../model-post/model-post.component';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PostPopover } from './post-popover';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { Platform } from 'ionic-angular';

// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@Component({
  selector: 'app-common-post',
  templateUrl: './common-post.component.html',
  styleUrls: ['./common-post.component.scss'],
  providers: [AuthService, VideoPlayer]
})
export class CommonPostComponent implements OnInit, OnChanges {

  public response: any;
  public like_btn: any = {'icon_name' : 'heart', 'color': 'danger' };
  public userInfo: any = null;
  public pageOffset: any;
  public nextOffset: number;
  public reqOpts;
  public posts: any = [];
  public enableScroll = true;
  public postCategories: any = [];
  public postTypes: any = [];
  public followers: any = [];

  @Input()
  public profileInfo: any;
  
  @Input()
  public isProfileType: string;

  @Input()
  public isProfile = false;

  constructor(private menu: MenuController,
    public popoverController: PopoverController,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public api: RestApiService,
    private videoPlayer: VideoPlayer,
    private domSanitizer: DomSanitizer,
    private toastCtrl: ToastController,
    public router: Router,
    // private youtube: YoutubeVideoPlayer,
    public authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserInfo().then(items => {
      this.userInfo = items;
      if (this.isProfile === true) {
        this.fetchProfilePosts();
      } else {
        this.fetchPosts();
        this.getPostCategories();
        this.getTagBloggotians();
      }
    });
    this.presentLoadingWithOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['isProfileType'] !== undefined) {
      this.isProfileType = changes['isProfileType']['currentValue'];
      if (this.isProfile === true) {
        this.fetchProfilePosts();
      }
    }
  }

  checkYouTubeVideo(URL) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(URL);
  }

  openYoutubeVideo(videoId) {
    // this.youtube.openVideo(videoId);
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

  fetchPosts() {
    this.pageOffset = 0;
    this.api.getStaticData('post/post_list?offset=0&app_id=bloggoto_app_123456', this.reqOpts).subscribe(result => {
      const res: any = result;
      if (res !== undefined) {
        this.loadingController.dismiss();
        this.enableScroll = false;
        this.response = res[0];
        this.pageOffset = res[0].next_set;
        this.nextOffset = res[0].next_set;
        this.posts = res[0].records;
      }
    }, err => {
      console.log(err);
    });
  }

  loadFetchPosts() {
    if (this.isProfile === true) {
      const body = new FormData();
      body.append('userid', this.profileInfo.info.customer_id);
      body.append('offset', this.pageOffset);
      body.append('type', this.isProfileType);
      this.api.postData('profile/viewblogs', body).subscribe(results => {
        const res: any = results;
        if (res !== undefined) {
          this.pageOffset = res[0].data.next_set;
          this.nextOffset = res[0].data.next_set;
          const morePosts = res[0].data.records;
          this.posts = this.posts.concat(morePosts);
        }
      }, err => {
        console.log(err);
      });
    } else {
      this.api.getStaticData('post/post_list?offset=' + this.pageOffset + '&app_id=bloggoto_app_123456', this.reqOpts).subscribe(result => {
        const res: any = result;
        if (res !== undefined) {
          this.pageOffset = res[0].next_set;
          this.nextOffset = res[0].next_set;
          const morePosts = res[0].records;
          this.posts = this.posts.concat(morePosts);
        }
      }, err => {
        console.log(err);
      });
    }
  }

  loadMorePosts(offset) {
    this.pageOffset = offset;
    this.loadFetchPosts();
  }

  fetchProfilePosts() {
    const body = new FormData();
    body.append('userid', this.profileInfo.info.customer_id);
    body.append('offset', '0');
    body.append('type', this.isProfileType);
    this.api.postData('profile/viewblogs', body).subscribe(results => {
      const response: any = results;
      if (response !== undefined) {
        this.posts = response[0].data.records;
        this.nextOffset = response[0].data.next_set;
      }
      this.loadingController.dismiss();
    });
  }

  async presentPostPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PostPopover,
      componentProps: {
        post: ev,
        userInfo: this.userInfo
      },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async showcomment(data) {
    const modal = await this.modalController.create({
      component: ModelPostComponent,
      componentProps: {
        'type': 'comment',
        'post': data,
        'userInfo': this.userInfo
      }
    });
    return await modal.present();
  }

  async createPost() {
    const modal = await this.modalController.create({
      component: ModelPostComponent,
      componentProps: {
        'type': 'post',
        'post': '',
        'postCategories': this.postCategories,
        'postTypes': this.postTypes,
        'userInfo': this.userInfo,
        'followers': this.followers
      }
    });
    return await modal.present();
  }

  checkliked_user(data, type) {

    if (this.userInfo !== null && ((type === 'lkesuser' && data.lkesuser.length > 0) ||
    (type === 'favoruser' && data.favoruser.length > 0))) {
      if ( (type === 'lkesuser' && data.lkesuser.includes(this.userInfo.bg_user_id)) ||
      (type === 'favoruser' && data.favoruser.includes(this.userInfo.bg_user_id))) {
        return false;
      }
    }
    return true;
  }
  checkunliked_user(data, type) {

    if (this.userInfo !== null && ((type === 'lkesuser' && data.lkesuser.length > 0) ||
    (type === 'favoruser' && data.favoruser.length > 0))) {
      if ( (type === 'lkesuser' && data.lkesuser.includes(this.userInfo.bg_user_id)) ||
      (type === 'favoruser' && data.favoruser.includes(this.userInfo.bg_user_id))) {
        return true;
      }
    }
    return false;
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

  likeButton(data) {
    let message = 'Login is Required';
    if (this.userInfo !== null) {
      const body = new FormData();
      body.append('user_id', this.userInfo.bg_user_id);
      body.append('post_id', data.post_id);
      this.api.postData('post/post_likes', body).subscribe(result => {
        const res: any = result;
        if (res !== undefined) {
          if (res[0].status === 'success') {
            if (res[0].message === 'Unfollow') {
              data.lkesuser.push(this.userInfo.bg_user_id);
              message = 'Post liked Successfully';
            } else {
              const index = _.indexOf(data.lkesuser, this.userInfo.bg_user_id);
              if (index >= 0 ) {
                data.lkesuser.splice(index, 1);
              }
              message = 'Post disliked Successfully';
            }
          } else {
            message = 'Something went wrong, Try again later';
          }
        } else {
          message = 'Something went wrong, Try again later';
        }
        this.presentToastWithOptions(message);
      });
    } else {
      this.presentToastWithOptions(message);
    }
  }

  bookmark(data) {
    let message = 'Login is Required';
    if (this.userInfo !== null) {
      const body = new FormData();
      body.append('user_id', this.userInfo.bg_user_id);
      body.append('post_id', data.post_id);
      this.api.postData('post/post_favor', body).subscribe(result => {
        const res: any = result;
        if (res !== undefined) {
          if (res[0].status === 'success') {
            if (res[0].message === 'Favor') {
              // if(data.favoruser.length > 0 && data.favoruser.includes(this.userInfo.bg_user_id)) {
              data.favoruser.push(this.userInfo.bg_user_id);
              message = 'Post favoured Successfully';
            } else {
              const index = _.indexOf(data.favoruser, this.userInfo.bg_user_id);
              if (index >= 0 ) {
                data.favoruser.splice(index, 1);
                message = 'Post unfavoured Successfully';
              }
            }
          } else {
            message = 'Something went wrong, Try again later';
          }
        } else {
          message = 'Something went wrong, Try again later';
        }
        this.presentToastWithOptions(message);
      });
    } else {
      this.presentToastWithOptions(message);
    }
  }

  shoePostTime(data) {
    const currentDate = new Date();
    const createdDate = new Date(data.post_created_on);
    const diff: any = (currentDate.getTime() - createdDate.getTime());
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const month = Math.floor(hrs / 720);
    const days = Math.floor(hrs / 24);
    const yrs = Math.floor(days / 365);
    let result_display: any = '';
    if (yrs > 1) {
      result_display += yrs + ' years';
    } else if (month > 1) {
      result_display += month + ' months';
    } else if (days > 1) {
      result_display += days + ' days';
    } else if (hrs > 1) {
      result_display += hrs + ' hours';
    } else if (mins > 1) {
      if (mins >= 1 && mins <= 5) {
        result_display += 'few minutes';
      }	else {
        result_display += mins + ' minutes';
      }
    } else {
      return result_display += 'just now';
    }
    return result_display += ' ago';
  }

  ionRefresh(event, offset) {
    if (offset !== '') {
      if (offset !== undefined) {
        this.pageOffset = offset;
        console.log('ionrefresh Event Triggered!');
        this.loadFetchPosts();
      } else {
        this.fetchPosts();
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

  userProfile(customerid) {
    this.router.navigate(['/profile'], { queryParams: { customer: customerid } });
  }

}
