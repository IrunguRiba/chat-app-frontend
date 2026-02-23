import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
private socket:Socket


constructor(private http: HttpClient){
  this.socket = io('http://localhost:4000');
}

emit(event:string, data:any){
  console.log('Emitting event:', event, 'with data:', data);
  this.socket.emit(event, data);
}


on(event:string): Observable<any>{
  console.log('Subscribing to event:', event);
  return new Observable ((observer:any)=>{
    this.socket.on(event, (data:any)=>{
observer.next(data)
    });
    return () => {
      this.socket.off(event);
    };
  })
}
  
}
