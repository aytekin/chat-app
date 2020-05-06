import { Component, OnInit } from '@angular/core';
import {User} from "../shared/model/User";
import ChatService from "../services/chat-service";
import SharedFunctions from "../shared/shared-functions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  users: User[];
  sharedFunctions = new SharedFunctions(this.route);

  constructor(private chatService: ChatService,
              private route: Router ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.chatService.getAllUsers().subscribe(x=>{
      console.log(x);
      this.users = x;
    })
  }

  redirectChatPage(username: string) {
    this.sharedFunctions.redirectToPage('/chat/' + username);
  }
}
