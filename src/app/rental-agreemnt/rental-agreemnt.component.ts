import { Component, Inject } from '@angular/core';
import { RentalAgreement } from '../models/rentalAgreement';
import { RentalAgreementService } from '../services/rental-agreement.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { Offerings } from '../models/offerings';
import { OfferingsService } from '../services/offerings.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-rental-agreemnt',
  templateUrl: './rental-agreemnt.component.html',
  styleUrls: ['./rental-agreemnt.component.css']
})
export class RentalAgreemntComponent {
  displayedColumns: string[] = ['customer', 'address', 'phone', 'offering', 'options'];

  rentalAgreement: RentalAgreement[] = [];

  constructor(
    private rentalAgreementsService: RentalAgreementService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}
  openDialog(rentalAgreement: RentalAgreement): void {
    console.log(rentalAgreement)
    const dialogRef = this.dialog.open(RentalAgreementDialog, {
      data: rentalAgreement,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result !== undefined) {
        if(result.id === undefined){
          this.rentalAgreementsService.add(result).subscribe(result => {
            this._snackBar.open("Ny Utstyr / teneste oppreta", "", {
              duration: 3000
            });
          })
        }else {
          this.rentalAgreementsService.edit(result).subscribe(result => {
            this._snackBar.open("redigert Utstyr / teneste med id:" + result.id, "", {
              duration: 3000
            });
          })
        }
      }
    });
  }

  creatNewOffering() {
    return new RentalAgreement();
  }

  deleteOffering(rentalAgreement: RentalAgreement) {
    this.rentalAgreementsService.delete(rentalAgreement).subscribe(result => {
      this._snackBar.open("Sletta Utstyr / teneste med id:" + result.id, "", {
        duration: 3000
      });
    })
  }

  ngOnInit(): void {
    this.rentalAgreementsService.get()
      .subscribe((result: RentalAgreement[]) => (this.rentalAgreement = result));
  }

  public isLoggedIn() {
    const token : string | null = localStorage.getItem('auth-token');
    if(token !== null)
    {
      return true;
    } else {
      return false;
    }
  }

}

@Component({
  selector: 'edit-rental-agreement-dialog',
  templateUrl: 'edit-rental-agreement-dialog.html',
  styleUrls: ['./rental-agreemnt.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, NgIf, NgFor, MatNativeDateModule, MatDatepickerModule],
})
export class RentalAgreementDialog {
  constructor(
    private customerService: CustomerService,
    private offeringsService: OfferingsService,
    public dialogRef: MatDialogRef<RentalAgreementDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RentalAgreement,
  ) {}

  customers: Customer[] = [];
  equipment: Offerings[] = [];

  ngOnInit(): void {
    this.customerService.get()
      .subscribe((result: Customer[]) => (this.customers = result));

    this.offeringsService.getAll()
      .subscribe((result: Offerings[]) => (this.equipment = result));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
