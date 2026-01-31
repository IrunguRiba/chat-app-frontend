import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  
templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  closeButton='close.png'
  signUpModalOpen=false

  openSignUp(){
    this.signUpModalOpen=true
  }
  
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]], 
      phone: ['',[ Validators.required,  Validators.pattern('^[0-9]{10}$'),],],
    });
  }

  
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      this.router.navigate(['/sign-in']);
    } else {
      console.log('Form is invalid');
    }

   
  }

  privacyPage(){

  }
}
