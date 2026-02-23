import { Component } from '@angular/core';
import { Texts } from './texts/texts';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from "jwt-decode";
import { MainService } from './../main-service';
import { Header } from './header/header';
import { Status } from './status/status';
import { Notification } from './notification/notification';
import { Group } from './group/group';




@Component({
  selector: 'app-messages',
  imports: [CommonModule, Header, Status, Notification, Texts, Group],
templateUrl: './messages.html',
  styleUrl: './messages.css',
  standalone: true
})
export class Messages {

}
