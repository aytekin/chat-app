import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SignalRService} from '../services/signal-r.service';
import {ChatUser} from '../shared/model/ChatUser';
import {LoginServiceService} from "./login-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;


  constructor(private signalRService: SignalRService, private loginService:LoginServiceService) {
  }

  ngOnInit(): void {
    this.signalRService.buildConnection();
    this.signalRService.startConnection();
  }

  submit(form: NgForm) {
    if (form.valid) {
      this.signalRService.loginSend(this.username);
      this.signalRService.userReceived.subscribe((user: ChatUser) => {
        console.log('login component ');
        console.log(user);
      });

    }

    // localStorage.setItem('email', 'email@example.com');
    // alert(localStorage.getItem('email'));
  }

  saveUser() {
    console.log(this.username + " us");
    this.loginService.saveUser(this.username).subscribe(x=>{
      localStorage.setItem('username', x.value);
    })
  }
}
