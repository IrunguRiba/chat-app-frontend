import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import {MainService} from '../../main-service'



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

  constructor(private fb: FormBuilder, private router:Router, private mainService:MainService) {

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]], 
      number: ['',[ Validators.required,  Validators.pattern('^[0-9]{10}$'),],],
    });
  }

  
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);

      const user=this.contactForm.value
      console.log(`user ${user}`)

     this.mainService.register(user).subscribe({

      next:(data:any)=>{
        console.log('Registration successful', data);
        this.router.navigate(['/sign-in']);

      },
      error: (error:any)=>{
        console.error('Registration failed', error);
      },
      complete: ()=>{console.log('Registration Complete')}
     })
    } else {
      console.log('Form is invalid');
    }

   
  }

  privacyPage(){

  }
}
