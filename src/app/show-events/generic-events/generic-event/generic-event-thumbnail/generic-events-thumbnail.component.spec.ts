import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericEventsThumbnailComponent } from './generic-events-thumbnail.component';

describe('GenericEventsThumbnailComponent', () => {
  let component: GenericEventsThumbnailComponent;
  let fixture: ComponentFixture<GenericEventsThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericEventsThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericEventsThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
