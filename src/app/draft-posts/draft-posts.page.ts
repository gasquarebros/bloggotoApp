import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginHeaderComponent } from '../share-module/login-header/login-header.component';
import { CommonPostComponent } from '../share-module/common-post/common-post.component';
import { AuthService } from '../auth/auth.service';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-draft-posts',
  templateUrl: './draft-posts.page.html',
  styleUrls: ['./draft-posts.page.scss'],
  providers: [AuthService]
})
export class DraftPostsPage implements OnInit {

  public userInfo: any = null;

  public profileType: string;
  public profileView: string;
  public title: string;

  @ViewChild(CommonPostComponent)
  public commonPostComponent: CommonPostComponent;

  constructor(
    public api: RestApiService,
    // private youtube: YoutubeVideoPlayer,
    private route: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.profileView = 'post';
    this.authService.getUserInfo().then(items => {
      this.userInfo = items;
    });

    if (queryParams !== undefined && queryParams.type !== undefined && queryParams.type === 'Favourites') {
      this.title = 'Favourites';
      this.profileType = 'favourite';
    } else {
      this.title = 'Drafts';
      this.profileType = 'draft';
    }
  }

}
