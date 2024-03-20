import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  show: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  submit() {
    console.log('user name is ' + this.username);
    this.clear();
  }

  clear() {
    this.username = '';
    this.password = '';
    this.show = true;
  }

  login(event: Event, email: string, password: string) {
    event.preventDefault();

    this.userService.login();
    this.router.navigate(['/home']);
  }
}
