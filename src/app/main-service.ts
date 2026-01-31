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

 private  url='http://localhost:4000/api/v1/contact/new'

  constructor( private http:HttpClient  ){}

  register(user:User): Observable<User>{
    return this.http.post<User>(this.url, user).pipe(
      catchError((err:any)=>{
        console.error("Something went wrong during registration", err)
        return throwError(() => err);
      }) 
    )
  } 
}
