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
  //https://chat-pp-backend.onrender.com

 private  url='https://chat-pp-backend.onrender.com/api/auth'
 private localUrl='http://localhost:4000/api/auth'

  constructor( private http:HttpClient  ){}

  register(user:User): Observable<User>{
    console.log('register user:', user);
    return this.http.post<User>(`${this.url}/signup`, user).pipe(
      catchError((err:any)=>{
        console.error("Something went wrong during registration", err)
        return throwError(() => err);
      }) 
    )
  } 

  login (username:string, phonenumber:string): Observable<User>{
    console.log(`Logging user ${username}, ${phonenumber}`)
    return this.http.post<User> (`${this.url}/signin`, {
      username,
      phonenumber
    }).pipe(
      catchError((err:any)=>{
        console.error("Something went wrong during registration", err)
        return throwError(() => err);
      }) 
    )

  }

  getUser(): Observable<User>{
    return this.http.get<User>(`${this.url}/all`).pipe(
      catchError((err:any)=>{
        console.error("Something went wrong during registration", err)
        return throwError(() => err);
      }) 
    )
  }

}
