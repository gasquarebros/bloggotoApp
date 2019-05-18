import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPostPage } from './model-post.page';

describe('ModelPostPage', () => {
  let component: ModelPostPage;
  let fixture: ComponentFixture<ModelPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
