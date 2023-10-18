import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Offerings } from '../models/offerings';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = environment.apiUrl + 'Offerings';
  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + "/getAll");
  }
  public addOffering(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }
  public editOffering(customer: Offerings): Observable<Customer> {
    return this.http.put<Customer>(this.apiUrl, customer);
  }
  public deleteOffering(customer: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiUrl}/${customer.id}`);
  }
}
