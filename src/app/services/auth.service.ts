import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserDto } from '../interfaces/UserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl + 'Auth/';
  constructor(private http: HttpClient) {
  }



  login(userDto: UserDto) {
    const json = {
      email: userDto.email,
      password: userDto.password
    }
    return this.http.post<UserDto>(this.apiUrl + 'Login', json ).pipe(
      tap((_) => this.log('logging in')),
      catchError(this.handleError<any>('login')),
      map((response) => {
        this.setToken(response);
        return response;
      })
    );

  }

  getToken() {
    return localStorage.getItem('auth-token');
  }

  private setToken(resultToken: string) {

    localStorage.setItem('auth-token', resultToken);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.error.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result as T);
      return of(error);
    };
  }
  private log(message: string) {
    /*this.messageService.add(`ApiServi: ${message}`);*/
    //console.log(`ApiService: ${message}`);
  }
}
