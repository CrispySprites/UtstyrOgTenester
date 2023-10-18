import { Injectable } from '@angular/core';
import { Offerings } from '../models/offerings';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferingsService {

  apiUrl = environment.apiUrl + 'Offerings';
  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Offerings[]> {
    return this.http.get<Offerings[]>(this.apiUrl + "/getAll");
  }

  public getEquipment(): Observable<Offerings[]> {
    return this.http.get<Offerings[]>(this.apiUrl + '/GetEquipment');
  }

  public getServices(): Observable<Offerings[]> {
    return this.http.get<Offerings[]>(this.apiUrl + '/GetServices');
  }

  public addOffering(offering: Offerings): Observable<Offerings> {
    return this.http.post<Offerings>(this.apiUrl, offering);
  }
  public editOffering(offering: Offerings): Observable<Offerings> {
    return this.http.put<Offerings>(this.apiUrl, offering);
  }
  public deleteOffering(offering: Offerings): Observable<Offerings> {
    return this.http.delete<Offerings>(`${this.apiUrl}/${offering.id}`);
  }
}
