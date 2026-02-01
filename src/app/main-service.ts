import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {User} from './interfaces/user'
import {Observable, throwError} from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class MainService {

  // http://localhost:4000/api/v1/contact/new
  // http://localhost:4000/api/v1/contact/login

 private  url='http://localhost:4000/api/v1/contact'

  constructor( private http:HttpClient  ){}

  register(user:User): Observable<User>{
    console.log('register user:', user);
    return this.http.post<User>(`${this.url}/register`, user).pipe(
      catchError((err:any)=>{
        console.error("Something went wrong during registration", err)
        return throwError(() => err);
      }) 
    )
  } 

  login (name:string, number:string): Observable<User>{
    console.log(`Logging user ${name}, ${number}`)
    return this.http.post<User> (`${this.url}/login`, {
      name,
      number
    }).pipe(
      catchError((err:any)=>{
        console.error("Something went wrong during registration", err)
        return throwError(() => err);
      }) 
    )

  }
}
