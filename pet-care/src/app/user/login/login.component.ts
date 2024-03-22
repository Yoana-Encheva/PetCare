import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

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
    this.clear();
  }

  clear() {
    this.username = '';
    this.password = '';
    this.show = true;
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.login();
    this.router.navigate(['/home']);
  }
}
