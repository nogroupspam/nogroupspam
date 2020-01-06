import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorReloadComponent } from './dialog-error-reload.component';

describe('DialogErrorReloadComponent', () => {
  let component: DialogErrorReloadComponent;
  let fixture: ComponentFixture<DialogErrorReloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogErrorReloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogErrorReloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
