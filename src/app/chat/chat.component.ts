import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SignalRService} from "../services/signal-r.service";
import ChatService from "../services/chat-service";
import SharedFunctions from "../shared/shared-functions";
import {Message} from "../shared/model/Message";
import {HubConnection} from "@aspnet/signalr";
import * as SignalR from "@aspnet/signalr";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public fromName: string;
  public toName: string;
  public messageList: Message[];
  private _hubConnection: HubConnection;

  private sharedFunctions = new SharedFunctions(this.router);
  message: string;

  constructor(private route: ActivatedRoute,
              private signalRService: SignalRService,
              private chatService: ChatService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fromName = this.sharedFunctions.readLocalStorage('user').username;
    this.toName = this.route.snapshot.paramMap.get('id');
    this.startConnection();
    this.getMessages();
    this.listenMessage();
  }

  sendMessage() {
    this.saveMessage();
  }

  saveMessage(){
    const receiveMessage = new Message(this.message,this.fromName,this.toName,null,new Date().toLocaleString());
    this.messageList.push(receiveMessage);
    this._hubConnection.invoke('PrivateChat', this.fromName,this.toName,this.message).then(res=>{
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

    this._hubConnection.on('receiveMessage', (message,fromUser) => {
      const receiveMessage = new Message(message,this.toName,fromUser,null,new Date().toLocaleString());
        this.messageList.push(receiveMessage);
      }
    );
  }

  private getMessages() {
    this.chatService.getUserMessages(this.toName,this.fromName).subscribe(x=>{
      this.messageList = x;
      console.log(x);
      console.log(this.messageList);
    });
  }

  private listenMessage() {

  }

  private invoke() {

  }
}
