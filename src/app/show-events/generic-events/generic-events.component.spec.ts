import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericEventsComponent } from './generic-events.component';

describe('GenericEventsComponent', () => {
  let component: GenericEventsComponent;
  let fixture: ComponentFixture<GenericEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
