import { Component } from '@angular/core';
import { Texts } from './texts/texts';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';


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

  constructor( private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false; 
      this.cdr.detectChanges();
    }, 4000); 

    setTimeout(() => {
this.showLine=false
    }, 4000);

  }


  logoutUser(){
    this.router.navigate(['/sign-in']);
  }
}
