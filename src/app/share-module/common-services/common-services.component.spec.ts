import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonServicesPage } from './common-services.page';

describe('CommonServicesPage', () => {
  let component: CommonServicesPage;
  let fixture: ComponentFixture<CommonServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
