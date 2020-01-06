import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerificateActionComponent } from './dialog-verificate-action.component';

describe('DialogVerificateActionComponent', () => {
  let component: DialogVerificateActionComponent;
  let fixture: ComponentFixture<DialogVerificateActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVerificateActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVerificateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
