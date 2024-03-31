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
  loading: boolean = false;
  errored: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.loading = true;

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe({
      next: (userData) => {
        this.loading = false;
        localStorage.setItem('[user-id]', userData.objectId);

        this.router.navigate(['/home']);
      },
      error: () => {
        this.loading = false;
        this.errored = true;
      },
    });
  }
}
