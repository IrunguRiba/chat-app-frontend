import { Component } from '@angular/core';
import { Texts } from './texts/texts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-messages',
  imports: [Texts],
templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {
  searchIcon='/search.png'
  addStatusIcon='img1.webp';
  addStatusIcon2='img2.jpg';
  logout='log-out.png';

  constructor( private router: Router) {}

  logoutUser(){
    this.router.navigate(['']);
  }
}
