import { Component, OnInit } from '@angular/core';
import SharedFunctions from "../shared/shared-functions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  private sharedFunctions = new SharedFunctions(this.route);
  username: string = 'mcaylak';

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  redirectChatPage() {
    this.sharedFunctions.redirectToPage('/chat/' + this.username);
  }
}
