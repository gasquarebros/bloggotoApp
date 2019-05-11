import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss'],
})
export class LoginHeaderComponent implements OnInit {

  @Input()
  public title: string;

  constructor() { }

  ngOnInit() {}

}
