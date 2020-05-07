import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SignalRService} from '../services/signal-r.service';
import {Message} from '../shared/model/Message';
import {HubConnection} from '@aspnet/signalr';
import * as SignalR from '@aspnet/signalr';
import {HttpClient} from '@angular/common/http';
import ChatService from '../services/chat-service';
import SharedFunctions from '../shared/shared-functions';


@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit, OnDestroy {

  public fromName: string;
  public groupName: string;
  public message: string;
  public messageList: Message[];

  private hubConnection: HubConnection;
  private sharedFunctions = new SharedFunctions(this.router);

  constructor(private signalRService: SignalRService,
              private router: Router,
              private route: ActivatedRoute,
              private chatService: ChatService) {
  }

  ngOnDestroy(): void {
    this.hubConnection.invoke('LeaveRoom', this.groupName).then(
      res => {
        console.log(res);
      }
    );
    this.hubConnection.stop().then(
      res => {
        console.log(res);
      }
    );
    localStorage.clear();
  }

  ngOnInit(): void {
    this.fromName = this.sharedFunctions.readLocalStorage('user').username;
    this.groupName = this.route.snapshot.paramMap.get('id');

    this.startConnection();
    this.fetchMessages();
  }


  sendMessage() {
    const receiveMessage = new Message(this.message, null, this.fromName, this.groupName, new Date().toLocaleString());
    this.messageList.push(receiveMessage);
    this.hubConnection.invoke('SendMessageToRoom', this.fromName, this.groupName, this.message).then(res => {
      debugger
      console.log('Mesaj gönderildi');
    });
  }


  private startConnection() {
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl('https://localhost:44322/chathub?username=' + this.fromName)
      .build();
    this.hubConnection
      .start()
      .then(() => {
        this.hubConnection.invoke('JoinRoom', this.groupName).then(
          res => {
            console.log(res);
          }
        );

      })
      .catch(err => console.log('Error while establishing connection :('));

    this.hubConnection.on('ReceiveGroupMessage', (message, fromUser) => {
        debugger
        if (fromUser !== this.fromName) {
          const receiveMessage = new Message(message, null, fromUser, this.groupName, new Date().toLocaleString());
          this.messageList.push(receiveMessage);
        }
      }
    );
  }

  private fetchMessages() {
    this.chatService.getGroupMessages(this.groupName).subscribe(
      res => {
        this.messageList = res;
      }
    );
  }
}
