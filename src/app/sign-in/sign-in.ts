import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  
  appleIcon='/apple.png';
  googleIcon='/google.png';
  logo='/logo.png';
  constructor(private router: Router) {}

  goToMessages(){
    this.router.navigate(['/messages']);
  }


}
