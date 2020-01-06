import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateGenericEventComponent } from "./create-generic-event.component";

describe("CreateGenericEventComponent", () => {
  let component: CreateGenericEventComponent;
  let fixture: ComponentFixture<CreateGenericEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGenericEventComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGenericEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
