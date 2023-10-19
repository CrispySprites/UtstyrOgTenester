import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditOfferingDialog } from '../equipment/equipment.component';
import { Offerings } from '../models/offerings';
import { OfferingsService } from '../services/offerings.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent {
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
    this.offeringsService.getServices()
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
