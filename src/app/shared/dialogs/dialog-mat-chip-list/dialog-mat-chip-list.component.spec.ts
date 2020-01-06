import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMatChipListComponent } from './dialog-mat-chip-list.component';

describe('DialogMatChipListComponent', () => {
  let component: DialogMatChipListComponent;
  let fixture: ComponentFixture<DialogMatChipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMatChipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMatChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
