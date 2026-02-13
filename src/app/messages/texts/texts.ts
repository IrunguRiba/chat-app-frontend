import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { SocketService } from '../../socket-service';
import { Subscription } from 'rxjs';
import {jwtDecode} from "jwt-decode";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-texts',
  imports: [FormsModule, DatePipe, CommonModule],
  standalone: true,
  templateUrl: './texts.html',
  styleUrls: ['./texts.css'], // ✅ fixed
})
export class Texts implements OnInit, OnDestroy {
  private messageSubscription!: Subscription;
  @Input() statusData: { name: string; number: string } | null = null;

  addStatusIcon='img1.webp';
  addStatusIcon2='img2.jpg';
  searchIcon='/search.png';
  groupIcon='/group-chat.png';
  searchIcon2='/search2.png';
  username: string=''
  phoneNumber:string='';
  receiverNumber:string=''
  content:string=''
  msgStatus:string='unread'

  messages: any[] = [];

  joinGroup:string[]=[]

  constructor(private socketService: SocketService, private router: Router) {
    this.messageSubscription = this.socketService.on('incoming-message').subscribe((data: any) => {
      const messageType = data.from === this.phoneNumber
      ? 'outgoing'
      : 'incoming';
     
      this.messages.push({
        ...data,
        type: messageType,
        createdAt: new Date(data.createdAt)
      });
      console.log('Received text', data);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statusData'] && changes['statusData'].currentValue) {
      const data = changes['statusData'].currentValue;
      this.username = data.name;
      this.receiverNumber = data.number;
      console.log('Selected receiver:', this.receiverNumber);
    }
    if (this.phoneNumber && this.receiverNumber) {
      this.socketService.emit('join', {
        sender: this.phoneNumber,
        receiver: this.receiverNumber
      });
    }
  }
  

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.phoneNumber = decoded.number;
      
    } else {
      this.router.navigate(['/sign-in']);
      return;
    }
  }

  sendMessage() {
    if (!this.content.trim()) return;
    if (!this.receiverNumber) {
      console.error('No receiver selected');
      return;
    }
    const messageData = {
      to: this.receiverNumber,
      from: this.phoneNumber,
      content: this.content,
      createdAt: new Date()
    };

    this.socketService.emit('outgoing-message', messageData);

    this.messages.push({
      ...messageData,
      type: 'outgoing',
      createdAt: new Date()
    });
    this.content = '';
    console.log(`Sending ${this.content} to: ${this.receiverNumber}`, );
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
