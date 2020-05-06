import {EventEmitter, Injectable} from '@angular/core';
import * as SignalR from '@aspnet/signalr';
import {ChatUser} from '../shared/model/ChatUser';
import SharedFunctions from "../shared/shared-functions";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  userReceived = new EventEmitter<ChatUser>();

  private hubConnection: SignalR.HubConnection;
  private sharedFunctions = new SharedFunctions(this.router);

  constructor(private router: Router) {
  }

  public buildConnection = () => {
    const username = this.sharedFunctions.readLocalStorage('username');
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl('https://localhost:44322/chathub?username='+ username)
      .build();
  };

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Login Connection Start...'))
      .catch(err => {
        console.log('Error : ' + err);
        setTimeout(function() {
          this.startConnection();
        }, 3000);
      });
  };

  public loginSend = (username: string) => {
    this.hubConnection.invoke('login', username)
      .catch(err => console.log(err));
  };

  public loginListener() {
    this.hubConnection.on('login', (res) => {
        this.userReceived.emit(res);
      }
    );
  };
}
