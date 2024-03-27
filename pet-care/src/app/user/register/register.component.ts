import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

import { emailValidator } from 'src/app/shared/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  get passGroup() {
    return this.form.get('passGroup');
  }

  get hasRePasswordError() {
    return Boolean(
      this.passGroup?.errors || this.passGroup?.get('rePassword')?.errors
    );
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const { name, email, passGroup: { password } = {} } = this.form.value;

    this.userService.register(name!, email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // this.isLoading = false;
        console.log('Error: ', err);
      },
    });
  }
}
