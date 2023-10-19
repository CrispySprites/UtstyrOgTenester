import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalAgreemntComponent } from './rental-agreemnt.component';

describe('RentalAgreemntComponent', () => {
  let component: RentalAgreemntComponent;
  let fixture: ComponentFixture<RentalAgreemntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalAgreemntComponent]
    });
    fixture = TestBed.createComponent(RentalAgreemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
