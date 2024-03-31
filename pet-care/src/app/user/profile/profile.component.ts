import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'src/app/types/user';
import { emailValidator } from 'src/app/shared/utils/email-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  errored: boolean = false;
  editMode: boolean = false;

  userDetails: User = {
    name: '',
    email: '',
  };

  form = this.fb.group({
    name: [
      { value: '', disabled: !this.editMode },
      [Validators.required, Validators.minLength(5)],
    ],
    email: [
      { value: '', disabled: !this.editMode },
      [Validators.required, emailValidator(['bg', 'com'])],
    ],
  });

  get hasData(): boolean {
    return Boolean(this.userDetails.name && this.userDetails.email);
  }

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.errored = false;

    this.userService.getProfile().subscribe({
      next: (userData) => {
        this.loading = false;

        const { name, email } = userData;

        this.userDetails = {
          name,
          email,
        };

        this.form.setValue({
          name,
          email,
        });
      },
      error: () => {
        this.loading = false;
        this.errored = true;
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    this.userDetails = { ...this.userDetails, ...this.form.value } as User;
    this.loading = true;
    this.errored = false;

    this.userService.updateProfile(this.userDetails).subscribe({
      next: () => {
        this.loading = false;
        this.toggleEdit();
      },
      error: () => {
        this.loading = false;
        this.errored = true;
      },
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    this.editMode ? this.enableFormControls() : this.disableFormControls();
  }

  enableFormControls(): void {
    this.form.get('name')?.enable();
    this.form.get('email')?.enable();
  }

  disableFormControls(): void {
    this.form.get('name')?.disable();
    this.form.get('email')?.disable();
  }
}
