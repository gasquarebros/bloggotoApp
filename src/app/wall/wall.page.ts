import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoginHeaderComponent } from '../share-module/login-header/login-header.component';
import { CommonPostComponent } from '../share-module/common-post/common-post.component';
import { AuthService } from '../auth/auth.service';
import { RestApiService } from '../rest-api.service';
// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import * as _ from 'underscore';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.page.html',
  styleUrls: ['./wall.page.scss'],
  providers: [AuthService]
})

export class WallPage implements OnInit {
  public userInfo: any = null;
  
  @ViewChild(CommonPostComponent)
  public commonPostComponent: CommonPostComponent;

  constructor(private menu: MenuController,
    public api: RestApiService,
    // private youtube: YoutubeVideoPlayer,
    public authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserInfo().then(items => {
      this.userInfo = items;
    });
  }

  createPost() {
    this.commonPostComponent.createPost();
  }
}
