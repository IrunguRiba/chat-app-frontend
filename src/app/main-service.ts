import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './interfaces/user'
@Injectable({
  providedIn: 'root',
})
export class MainService {

  // http://localhost:4000/api/v1/contact/new

 private  url='http://localhost:4000/api/v1/contact'

  constructor(http:HttpClient  ){}

  

  
}
