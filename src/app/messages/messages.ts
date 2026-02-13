import { Component } from '@angular/core';
import { Texts } from './texts/texts';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from "jwt-decode";
import { MainService } from './../main-service';

@Component({
  selector: 'app-messages',
  imports: [Texts, CommonModule],
templateUrl: './messages.html',
  styleUrl: './messages.css',
  standalone: true
})
export class Messages {
  searchIcon='/search.png'
  addStatusIcon='img1.webp';
  addStatusIcon2='img2.jpg';
  logout='log-out.png';
  isLoading = true;
  showLine= true

  users:any=[]
  username:string=''
  phoneNumber:string=''

  selectedStatus: { name: string; number: string } | null = null;
  
  selectStatus(user: any) {
    this.selectedStatus = {name: user.name, number: user.number };
  }
  constructor( private router: Router, private cdr: ChangeDetectorRef, private mainService: MainService) {}

  ngOnInit(): void {
this.recentPeople();

    setTimeout(() => {
      this.isLoading = false; 
      this.cdr.detectChanges();
    }, 4000); 

    setTimeout(() => {
this.showLine=false
    }, 4000);

  }
  
  recentPeople(){
    this.mainService.getUser().subscribe({
      next: (data:any) => {
        this.users = data.Users;
        console.log('Users list:', this.users);
        this.username = data.name;
        this.phoneNumber = data.number;
      },
      error: (err:any) => {
        console.error('Error fetching user data:', err);
      }
    })
  }

  textContact(){
    this.router.navigate(['/messages/text']);
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
}
