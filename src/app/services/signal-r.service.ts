import {EventEmitter, Injectable} from '@angular/core';
import * as SignalR from '@aspnet/signalr';
import SharedFunctions from '../shared/shared-functions';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {


  private hubConnection: SignalR.HubConnection;
  private sharedFunctions = new SharedFunctions(this.router);

  constructor(private router: Router) {
  }

  public buildConnection = () => {
    const username = this.sharedFunctions.readLocalStorage('username');
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl('https://localhost:44322/chathub?username=' + username)
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

  public sendBroadCastMessage = (message: string) => {
    this.hubConnection.invoke('ChatBroadCast', message)
      .catch(err => console.log(err));
  };

  public broadcastListener() {
    this.hubConnection.on('receiveBroadCast', (res) => {
      console.log(res);
      //this.userReceived.emit(res);
      }
    );
  };

  public sendUserMessage = (toUser: string,fromUser: string, message: string) => {
    this.hubConnection.invoke('PrivateChat', toUser,fromUser,message)
      .catch(err => console.log(err));
  };

  public userMessagesListener = (toUser: string,fromUser: string) => {
    this.hubConnection.on('receiveMessage', toUser,fromUser)
      .catch(err => console.log(err));
  };
}
