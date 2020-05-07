import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SignalRService} from '../services/signal-r.service';
import {LoginServiceService} from './login-service.service';
import SharedFunctions from '../shared/shared-functions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  private sharedFunctions = new SharedFunctions(this.router);

  constructor(private signalRService: SignalRService,
              private loginService: LoginServiceService,
              private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  submit(form: NgForm) {
    if (form.valid) {


    }

    // localStorage.setItem('email', 'email@example.com');
    // alert(localStorage.getItem('email'));
  }

  saveUser() {
    console.log(this.username + ' us');
    this.loginService.saveUser(this.username).subscribe(x => {
      this.sharedFunctions.setLocalStorage('username', x.value);
      this.sharedFunctions.redirectToPage('/home');
    });
  }
}
