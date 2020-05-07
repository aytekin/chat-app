import {Component, OnInit} from '@angular/core';
import {User} from '../shared/model/User';
import ChatService from '../services/chat-service';
import SharedFunctions from '../shared/shared-functions';
import {Router} from '@angular/router';
import {Group} from '../shared/model/Group';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  users: User[];
  sharedFunctions = new SharedFunctions(this.route);
  groups: Group[];

  constructor(private chatService: ChatService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllGroups();
  }

  getAllUsers() {
    this.chatService.getAllUsers().subscribe(x => {
      this.users = x;
      let index = this.users.findIndex(x => x.username == this.sharedFunctions.readLocalStorage('user').username);
      this.users.splice(index, 1);
    });
  }

  redirectChatPage(username: string) {
    this.sharedFunctions.redirectToPage('/chat/' + username);
  }

  redirectToAllChat() {
    this.sharedFunctions.redirectToPage('/all-chat');
  }

  getAllGroups() {
    this.chatService.getAllGroups().subscribe(res => {
      this.groups = res;
    });
  }

  redirectGroupChatPage(groupName: string) {
    this.sharedFunctions.redirectToPage('/groupChat/' + groupName);
  }
}
