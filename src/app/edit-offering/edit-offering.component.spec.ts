import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfferingComponent } from './edit-offering.component';

describe('EditOfferingComponent', () => {
  let component: EditOfferingComponent;
  let fixture: ComponentFixture<EditOfferingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOfferingComponent]
    });
    fixture = TestBed.createComponent(EditOfferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
