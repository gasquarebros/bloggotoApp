import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonProductsPage } from './common-products.page';

describe('CommonProductsPage', () => {
  let component: CommonProductsPage;
  let fixture: ComponentFixture<CommonProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
