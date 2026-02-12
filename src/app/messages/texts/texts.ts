import { Component, OnInit, OnDestroy} from '@angular/core';
import { SocketService } from '../../socket-service';
import { Subscription } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Component({
  selector: 'app-texts',
  imports: [],
  templateUrl: './texts.html',
  styleUrl: './texts.css',
})
export class Texts implements OnInit, OnDestroy {
  private messageSubscription: Subscription
  addStatusIcon='img1.webp';
  addStatusIcon2='img2.jpg';
  searchIcon='/search.png';
  groupIcon='/group-chat.png';
  searchIcon2='/search2.png';
  username: string=''
  phoneNumber:string='';
  content:string=''
  msgStatus:string='unread'

  incomingMessage:string[]=[]
  outgoingMessage:string=''
  joinGroup:string[]=[]
  constructor(private socketService: SocketService, private router: Router){
    this.messageSubscription = this.socketService.on('incoming-message').subscribe((data: any) => {
      this.incomingMessage.push(data);
    });
  }

  ngOnInit(){

const token= localStorage.getItem('token');

if(token){

  const decoded: any= jwtDecode(token);
  const name = decoded.name;
  const number = decoded.number;
  this.username=name;
  this.phoneNumber=number;
  console.log('Name:', name);
  console.log('Number:', number);
}else{
this.router.navigate(['/sign-in'])
}

  }
 


  /*
What I need to do
1.send a text via socket connection
2. The intended user to receive the text
  */
  sendMessage() {
    this.socketService.emit('outgoing-message', { 
      to: this.phoneNumber,
      content: this.content,
    }
      );
    this.outgoingMessage = '';
  }
ngOnDestroy(){
  this.messageSubscription.unsubscribe();
}
}
