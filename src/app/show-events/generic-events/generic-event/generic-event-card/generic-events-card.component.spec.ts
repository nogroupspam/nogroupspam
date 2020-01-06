import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericEventsCardComponent } from './generic-events-card.component';

describe('GenericEventsCardComponent', () => {
  let component: GenericEventsCardComponent;
  let fixture: ComponentFixture<GenericEventsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericEventsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericEventsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
