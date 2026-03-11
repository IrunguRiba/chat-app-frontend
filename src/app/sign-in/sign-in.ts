import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { ChangeDetectorRef } from '@angular/core';
import { MainService } from '../main-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn implements OnInit {
  isLoading = true;

  appleIcon = '/apple.png';
  googleIcon = '/google.png';
  logo = '/logo.png';
  showLine = true;

  username = '';
  phonenumber = '';
  identifier = '';
  email = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private mainService: MainService
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 4000);

    setTimeout(() => {
      this.showLine = false;
    }, 4000);
  }

  bubbles = Array(100);

  onLogin() {
    let email: string | null = null;
    let phone: string | null = null;
    if (/^\d+$/.test(this.identifier.trim())) {
      phone = this.identifier.trim();
    } else {
      email = this.identifier.trim();
    }

    this.mainService.login(this.username.trim(), email, phone).subscribe({
      next: (data: any) => {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.Token);

        this.router.navigate(['/messages']);
      },
      error: (error: any) => {
        console.log('Something went wrong');
        console.error('Login failed', error);
        this.errorMessage = 'Invalid credentials';
        Swal.fire({
          title: 'Oops!',
          text: 'Invalid Credentials. Try Again',
          icon: 'error',
          background:
            'linear-gradient(90deg, rgba(52,38,10,0) 0%, rgba(129,98,25,0.8) 60%, rgba(52,38,10,0) 100%)',
          color: '#000000',
          confirmButtonColor: '#ff3b3b',
          iconColor: '#ff4d4d',
        });
      },
      complete: () => {
        console.log('complete loging user');
      },
    });
  }
}
