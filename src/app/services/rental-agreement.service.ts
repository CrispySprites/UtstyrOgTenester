import { Injectable } from '@angular/core';
import { RentalAgreement } from '../models/RentalAgreement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RentalAgreementService {

  apiUrl = environment.apiUrl + 'Offerings';
  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<RentalAgreement[]> {
    return this.http.get<RentalAgreement[]>(this.apiUrl + "/getAll");
  }
  public addOffering(rentalAgreement: RentalAgreement): Observable<RentalAgreement> {
    return this.http.post<RentalAgreement>(this.apiUrl, rentalAgreement);
  }
  public editOffering(rentalAgreement: RentalAgreement): Observable<RentalAgreement> {
    return this.http.put<RentalAgreement>(this.apiUrl, rentalAgreement);
  }
  public deleteOffering(rentalAgreement: RentalAgreement): Observable<RentalAgreement> {
    return this.http.delete<RentalAgreement>(`${this.apiUrl}/${rentalAgreement.id}`);
  }
}
