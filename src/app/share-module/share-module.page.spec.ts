import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareModulePage } from './share-module.page';

describe('ShareModulePage', () => {
  let component: ShareModulePage;
  let fixture: ComponentFixture<ShareModulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareModulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
