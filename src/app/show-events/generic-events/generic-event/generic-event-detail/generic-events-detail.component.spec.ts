import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericEventsDetailComponent } from './generic-events-detail.component';

describe('GenericEventsDetailComponent', () => {
  let component: GenericEventsDetailComponent;
  let fixture: ComponentFixture<GenericEventsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericEventsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericEventsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
