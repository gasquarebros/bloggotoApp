import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss'],
})
export class LoginHeaderComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public customerType: string;

  @Input()
  public star: boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {}

  navigatePage(event) {
    this.router.navigate(['/' + event]);
  }

}
