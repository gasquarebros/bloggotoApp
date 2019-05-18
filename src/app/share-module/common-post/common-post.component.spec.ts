import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPostPage } from './common-post.page';

describe('CommonPostPage', () => {
  let component: CommonPostPage;
  let fixture: ComponentFixture<CommonPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
