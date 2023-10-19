import { Component, Inject, Input } from '@angular/core';
import { Offerings } from '../models/offerings';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-offering',
  templateUrl: './edit-offering.component.html',
  styleUrls: ['./edit-offering.component.css']
})
export class EditOfferingComponent {
  @Input() Offering?: Offerings;
  @Input() color?: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.Offering,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}


