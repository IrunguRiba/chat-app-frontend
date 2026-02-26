import { Component, OnInit, OnDestroy, Input, SimpleChanges,  OnChanges  } from '@angular/core';
import { SocketService } from '../../socket-service';
import { Subscription } from 'rxjs';
import {jwtDecode} from "jwt-decode";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-texts',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './texts.html',
  styleUrls: ['./texts.css'], 
})
export class Texts {
  img1='img1.webp';
  searchText: string = '';
  addfile='camera.png'
  sendbtn='send.png'
}
