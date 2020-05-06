import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public chatId: string;

  constructor(private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('id');
  }

}
