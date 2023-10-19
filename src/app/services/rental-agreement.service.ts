import { Injectable } from '@angular/core';
import { RentalAgreement } from '../models/rentalAgreement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RentalAgreementService {

  apiUrl = environment.apiUrl + 'RentalAgreement';
  constructor(private http: HttpClient) {
  }

  public get(): Observable<RentalAgreement[]> {
    return this.http.get<RentalAgreement[]>(this.apiUrl + "/getAll");
  }
  public add(rentalAgreement: RentalAgreement): Observable<RentalAgreement> {
    return this.http.post<RentalAgreement>(this.apiUrl, rentalAgreement);
  }
  public edit(rentalAgreement: RentalAgreement): Observable<RentalAgreement> {
    return this.http.put<RentalAgreement>(this.apiUrl, rentalAgreement);
  }
  public delete(rentalAgreement: RentalAgreement): Observable<RentalAgreement> {
    return this.http.delete<RentalAgreement>(`${this.apiUrl}/${rentalAgreement.id}`);
  }
}
