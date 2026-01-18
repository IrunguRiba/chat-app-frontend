import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn implements OnInit {

  isLoading = true;

  appleIcon = '/apple.png';
  googleIcon = '/google.png';
  logo = '/logo.png';
  showLine= true  

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false; 
      this.cdr.detectChanges();
    }, 4000); 

    setTimeout(() => {
this.showLine=false
    }, 4000);

  }

  bubbles = Array(100);
  
  goToMessages() {
    this.router.navigate(['/messages']);
  }
}
