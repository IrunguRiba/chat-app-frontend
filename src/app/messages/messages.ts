import { Component } from '@angular/core';
import { Texts } from './texts/texts';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-messages',
  imports: [Texts, CommonModule],
templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {
  searchIcon='/search.png'
  addStatusIcon='img1.webp';
  addStatusIcon2='img2.jpg';
  logout='log-out.png';
  isLoading = true;
  showLine= true

  username:string=''
  phoneNumber:string=''

  constructor( private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
const token= localStorage.getItem('token')
if (token) {
  const decoded: any = jwtDecode(token);
  const name = decoded.name;
  this.username=name;
  console.log('Name:', name);
}else{
  return;
}
    setTimeout(() => {
      this.isLoading = false; 
      this.cdr.detectChanges();
    }, 4000); 

    setTimeout(() => {
this.showLine=false
    }, 4000);

  }


  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
}
