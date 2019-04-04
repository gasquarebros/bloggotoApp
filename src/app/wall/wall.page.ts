import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoginHeaderComponent } from '../login-header/login-header.component';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.page.html',
  styleUrls: ['./wall.page.scss'],
})
export class WallPage implements OnInit {
  Names: any= [
    { name:"divya", image:"assets/icon/avatar.png",content:"assets/icon/logo.png" },
    { name:"gowtham", image:"assets/icon/avatar.png",content:"assets/icon/logo.png"}
];

public stories = [
  {
    id: 1,
    img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
    user_name: 'candelibas'
  },
  {
    id: 2,
    img: 'https://pbs.twimg.com/profile_images/726955832785571840/8OxhcDxl_400x400.jpg',
    user_name: 'maxlynch'
  },
  {
    id: 3,
    img: 'http://ionicframework.com/dist/preview-app/www/assets/img/sarah-avatar.png.jpeg',
    user_name: 'ashleyosama'
  },
  {
    id: 4,
    img: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa_400x400.jpeg',
    user_name: 'adam_bradley'
  },
  {
    id: 5,
    img: 'https://avatars1.githubusercontent.com/u/1024025?v=3&s=120',
    user_name: 'linus_torvalds'
  }
];

  public like_btn: any = {'icon_name' : 'heart', 'color': 'danger' };

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
