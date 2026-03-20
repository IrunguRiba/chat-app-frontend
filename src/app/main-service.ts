import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './interfaces/user';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MainService {
  // http://localhost:4000/api/v1/contact/new
  // http://localhost:4000/api/v1/contact/login
  //https://chat-pp-backend.onrender.com

  private url = 'https://messaging-app-backend-v1.onrender.com/api/auth';
  private localUrl = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    console.log('register user:', user);
    return this.http.post<User>(`${this.url}/signup`, user).pipe(
      catchError((err: any) => {
        console.error('Something went wrong during registration', err);
        return throwError(() => err);
      })
    );
  }

  login(username: string, email: string | null, phonenumber: string | null): Observable<User> {
    if (!username) {
      return throwError(() => new Error('Username is required'));
    }

    if (!email && !phonenumber) {
      return throwError(() => new Error('Either email or phone number is required'));
    }

    const payload: any = { username };
    if (email) payload.email = email;
    if (phonenumber) payload.phonenumber = phonenumber;

    console.log('Login payload:', payload);

    return this.http.post<User>(`${this.url}/signin`, payload).pipe(
      catchError((err: any) => {
        console.error('Login failed', err);
        return throwError(() => err);
      })
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/all`).pipe(
      catchError((err: any) => {
        console.error('Something went wrong during registration', err);
        return throwError(() => err);
      })
    );
  }
}
