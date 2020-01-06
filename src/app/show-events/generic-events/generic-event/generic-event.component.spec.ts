import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericEventComponent } from './generic-event.component';

describe('GenericEventComponent', () => {
  let component: GenericEventComponent;
  let fixture: ComponentFixture<GenericEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
