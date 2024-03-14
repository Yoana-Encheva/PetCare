import { Injectable } from '@angular/core';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor() {
    try {
      const userData = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(userData);
    } catch (err) {
      this.user = undefined;
    }
  }

  login() {
    this.user = {
      name: 'John',
      email: 'test@abv.bg',
      password: '123456',
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }
}
