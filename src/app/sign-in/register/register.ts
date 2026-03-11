import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,  AbstractControl} from '@angular/forms';
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
  isSubmitting = false;
  redirecting=false
  backgroundVideo='vid1.mp4'

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    
    if (this.bgVideo?.nativeElement) {
      const videoEl = this.bgVideo.nativeElement;
      videoEl.load();
      videoEl.muted = true;
      videoEl.play().catch((err:any) => console.log('Autoplay blocked?', err));
    }
  }
  closeButton='close.png'
  signUpModalOpen=false

  openSignUp(){
    this.signUpModalOpen=true
  }
  
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private mainService:MainService) {

    this.contactForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(54)]],
      contact: ['', [Validators.required, this.emailOrPhoneValidator]]
    });
  }

  emailOrPhoneValidator(control: AbstractControl) {
    const value = (control.value || '').trim();  
    if (!value) return { required: true };
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
  
    if (emailPattern.test(value) || phonePattern.test(value)) {
      return null; 
    }
  
    return { invalidContact: true };
  }
  
  onSubmit(event: Event): void {
  this.contactForm.markAllAsTouched();
  event.preventDefault();

  if (!this.contactForm.valid || this.isSubmitting) {
    return;
  }

  this.isSubmitting = true;

  if (this.contactForm.valid) {

    const formValue = this.contactForm.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    let payload: any = {
      username: formValue.username
    };

    if (emailPattern.test(formValue.contact)) {
      payload.email = formValue.contact;
    } 
    else if (phonePattern.test(formValue.contact)) {
      payload.phonenumber = formValue.contact;
    }

    console.log('Payload sent to backend:', payload);

    this.mainService.register(payload).subscribe({
      next: (data: any) => {
        console.log('Registration successful', data);
       
        if(data.newuser._id){
        
            this.router.navigate(['/sign-in']);
        }
        
      },
      error: (error: any) => {
        console.error('Registration failed', error);
        this.isSubmitting = false;

      },
      complete: () => {
        console.log('Registration Complete');
        this.isSubmitting = false;
      }
    });

  } else {
    console.log('Form is invalid');
  }
}

  privacyPage(){

  }
  signInPage(){
    // this.router.navigate(['/sign-in']);
  }
}
