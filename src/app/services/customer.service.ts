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

  apiUrl = environment.apiUrl + 'Customer';
  constructor(private http: HttpClient) {
  }

  public get(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + "/getAll");
  }
  public add(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }
  public edit(customer: Offerings): Observable<Customer> {
    return this.http.put<Customer>(this.apiUrl, customer);
  }
  public delete(customer: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiUrl}/${customer.id}`);
  }
}
