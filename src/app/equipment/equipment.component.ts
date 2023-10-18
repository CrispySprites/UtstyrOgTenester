import { Component, Inject } from '@angular/core';
import { Offerings } from '../models/offerings';
import { OfferingsService } from '../services/offerings.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  displayedColumns: string[] = ['name', 'description', 'stock', 'options'];

  creatNewOffering = new Offerings();

  equipment: Offerings[] = [];

  constructor(
    private offeringsService: OfferingsService,
    public dialog: MatDialog
  ){}
  openDialog(offering: Offerings): void {
    const dialogRef = this.dialog.open(EditOfferingDialog, {
      data: offering,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.id === null){
        this.offeringsService.addOffering(result)
      }else {
        this.offeringsService.editOffering(result)
      }
    });
  }

  deleOffering(offering: Offerings) {
    this.offeringsService.deleteOffering(offering)
  }

  ngOnInit(): void {
    this.offeringsService.getEquipment()
      .subscribe((result: Offerings[]) => (this.equipment = result));
  }
}

@Component({
  selector: 'edit-offering-dialog',
  templateUrl: 'edit-offering-dialog.html',
  styleUrls: ['./equipment.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
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
