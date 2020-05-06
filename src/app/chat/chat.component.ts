import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SignalRService} from "../services/signal-r.service";
import ChatService from "../services/chat-service";
import SharedFunctions from "../shared/shared-functions";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public fromName: string;
  public toName: string;
  private sharedFunctions = new SharedFunctions(this.router);

  constructor(private route: ActivatedRoute,
              private signalRService: SignalRService,
              private chatService: ChatService,
              private router: Router) {
  }

  ngOnInit(): void {
    debugger;
    this.fromName = this.route.snapshot.paramMap.get('id');
    this.toName = this.sharedFunctions.readLocalStorage('username');
    this.chatService.getUserMessages(this.toName,this.fromName).subscribe(x=>{
      console.log(x);
    });
  }



}
