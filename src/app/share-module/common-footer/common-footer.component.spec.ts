import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFooterPage } from './common-footer.page';

describe('CommonFooterPage', () => {
  let component: CommonFooterPage;
  let fixture: ComponentFixture<CommonFooterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFooterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
