import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMatInputComponent } from './dialog-mat-input.component';

describe('DialogMatInputComponent', () => {
  let component: DialogMatInputComponent;
  let fixture: ComponentFixture<DialogMatInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMatInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
