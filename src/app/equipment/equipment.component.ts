import { Component, Inject } from '@angular/core';
import { Offerings } from '../models/offerings';
import { OfferingsService } from '../services/offerings.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  displayedColumns: string[] = ['name', 'description', 'stock', 'options'];

  equipment: Offerings[] = [];

  constructor(
    private offeringsService: OfferingsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}
  openDialog(offering: Offerings): void {
    console.log(offering)
    const dialogRef = this.dialog.open(EditOfferingDialog, {
      data: offering,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result !== undefined) {
        if(result.id === undefined){
          this.offeringsService.addOffering(result).subscribe(result => {
            this._snackBar.open("Ny Utstyr / teneste oppreta", "", {
              duration: 3000
            });
          })
        }else {
          this.offeringsService.editOffering(result).subscribe(result => {
            this._snackBar.open("redigert Utstyr / teneste med id:" + result.id, "", {
              duration: 3000
            });
          })
        }
      }
    });
  }

  creatNewOffering() {
    return new Offerings();
  }

  deleteOffering(offering: Offerings) {
    this.offeringsService.deleteOffering(offering).subscribe(result => {
      this._snackBar.open("Sletta Utstyr / teneste med id:" + result.id, "", {
        duration: 3000
      });
    })
  }

  ngOnInit(): void {
    this.offeringsService.getEquipment()
      .subscribe((result: Offerings[]) => (this.equipment = result));
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
  selector: 'edit-offering-dialog',
  templateUrl: 'edit-offering-dialog.html',
  styleUrls: ['./equipment.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, NgIf],
})
export class EditOfferingDialog {
  constructor(
    public dialogRef: MatDialogRef<EditOfferingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Offerings,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
