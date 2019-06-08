import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPostsPage } from './draft-posts.page';

describe('DraftPostsPage', () => {
  let component: DraftPostsPage;
  let fixture: ComponentFixture<DraftPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftPostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
