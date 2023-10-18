import { Component } from '@angular/core';
import { Offerings } from '../models/offerings';
import { OfferingsService } from '../services/offerings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  displayedColumns: string[] = ['name'];

  equipment: Offerings[] = [];
  services: Offerings[]= [];

  constructor(
    private offeringsService: OfferingsService,
  ){}

  ngOnInit(): void {
    this.offeringsService.getEquipment()
      .subscribe((result: Offerings[]) => (this.equipment = result));

    this.offeringsService.getServices()
      .subscribe((result: Offerings[]) => (this.services = result));

  }
}
