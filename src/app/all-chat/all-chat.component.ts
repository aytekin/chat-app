import { Component, OnInit } from '@angular/core';
import {Message} from "../shared/model/Message";
import {HubConnection} from "@aspnet/signalr";
import SharedFunctions from "../shared/shared-functions";
import {Route, Router} from "@angular/router";
import * as SignalR from "@aspnet/signalr";
import ChatService from "../services/chat-service";

@Component({
  selector: 'app-all-chat',
  templateUrl: './all-chat.component.html',
  styleUrls: ['./all-chat.component.css']
})
export class AllChatComponent implements OnInit {
  public fromName: string;
  public messageList: Message[];
  private _hubConnection: HubConnection;
  message: string;
  groupName = 'AllChat';

  private sharedFunctions = new SharedFunctions(this.router);

  constructor(private router: Router,
              private chatService: ChatService) { }

  ngOnInit(): void {
    this.fromName = this.sharedFunctions.readLocalStorage('user').username;
    this.startConnection();
    this.getMessages();
    this.setOnMethod();
  }

  sendMessage() {
    this._hubConnection.invoke('ChatBroadCast',this.message, this.fromName).then(res=>{
      console.log("Mesaj gönderildi");
    })
  }

  private startConnection() {
    this._hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl('https://localhost:44322/chathub?username=' + this.fromName)
      .build();
    this._hubConnection
      .start()
      .then(() => {
      })
      .catch(err => console.log('Error while establishing connection :('));
  }

  private getMessages() {
    this.chatService.getGroupMessages(this.groupName).subscribe(x=>{
      this.messageList = x;
      console.log(x);
    })
  }

  private setOnMethod() {
    this._hubConnection.on('receiveBroadCast', (message,fromName) => {
      console.log(fromName);
        const receiveMessage = new Message(message,null,fromName,'AllChat',new Date().toLocaleString());
        this.messageList.push(receiveMessage);
      }
    );
  }
}
