import { Component, Inject } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Offerings } from '../models/offerings';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  displayedColumns: string[] = ['name', 'address', 'phone', 'options'];

  customer: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}
  openDialog(rentalAgreement: Customer): void {
    console.log(rentalAgreement)
    const dialogRef = this.dialog.open(EditCustomerDialog, {
      data: rentalAgreement,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result !== undefined) {
        if(result.id === undefined){
          this.customerService.add(result).subscribe(result => {
            this._snackBar.open("Ny Utstyr / teneste oppreta", "", {
              duration: 3000
            });
          })
        }else {
          this.customerService.edit(result).subscribe(result => {
            this._snackBar.open("redigert Utstyr / teneste med id:" + result.id, "", {
              duration: 3000
            });
          })
        }
      }
    });
  }

  creatNewCustomer() {
    return new Customer();
  }

  deleteCustomer(customer: Customer) {
    this.customerService.delete(customer).subscribe(result => {
      this._snackBar.open("Sletta Utstyr / teneste med id:" + result.id, "", {
        duration: 3000
      });
    })
  }

  ngOnInit(): void {
    this.customerService.get()
      .subscribe((result: Customer[]) => (this.customer = result));
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
  selector: 'edit-customer-dialog',
  templateUrl: 'edit-customer-dialog.html',
  styleUrls: ['./customer.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, NgIf],
})
export class EditCustomerDialog {
  constructor(
    public dialogRef: MatDialogRef<EditCustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

