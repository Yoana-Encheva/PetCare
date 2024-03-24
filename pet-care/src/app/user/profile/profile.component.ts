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
  editMode: boolean = false;

  userDetails: User = {
    objectId: '',
    name: '',
    email: '',
    password: '',
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
    password: [
      { value: '', disabled: !this.editMode },
      [Validators.required, Validators.minLength(6)],
    ],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    const { objectId, name, email, password } = this.userService.user!;

    this.userDetails = {
      objectId,
      name,
      email,
      password,
    };

    this.form.setValue({
      name,
      email,
      password,
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.userDetails = { ...this.userDetails, ...this.form.value } as User;
    this.userService.updateProfile(this.userDetails);
    this.toggleEdit();
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    this.editMode ? this.enableFormControls() : this.disableFormControls();
  }

  enableFormControls(): void {
    this.form.get('name')?.enable();
    this.form.get('email')?.enable();
    this.form.get('password')?.enable();
  }

  disableFormControls(): void {
    this.form.get('name')?.disable();
    this.form.get('email')?.disable();
    this.form.get('password')?.disable();
  }
}
