import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-register',
  imports: [CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  signUpModalOpen=false

  openSignUp(){
    this.signUpModalOpen=true
  }
}
