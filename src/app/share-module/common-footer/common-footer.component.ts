import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-common-footer',
  templateUrl: './common-footer.component.html',
  styleUrls: ['./common-footer.component.scss'],
})
export class CommonFooterComponent implements OnInit {

  @Output()
  public updatePageType = new EventEmitter();

  @Input()
  public postProfileType: string;

  public profileView: string;

  constructor() { }

  ngOnInit() {}

  profileSection(section = '') {
    this.profileView = 'post';
    this.postProfileType = section;
    this.updatePageType.emit(this.postProfileType);
  }

}
