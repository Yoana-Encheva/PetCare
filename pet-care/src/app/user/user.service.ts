import { Injectable } from '@angular/core';
import { User, UserDetails } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: UserDetails | null;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  setUserData(userData: any) {
    this.user = userData;
  }

  constructor(private http: HttpClient) {
    try {
      const userData = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(userData);
    } catch (err) {
      this.user = null;
    }
  }

  login(email: string, password: string) {
    return this.http.post('client/login', {
      login: email,
      password,
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post('client/register', {
      name,
      email,
      password,
    });
  }

  logout() {
    return this.http.get('client/logout', {
      headers: { 'user-token': this.user?.['user-token'] || '' },
    });
  }

  updateProfile(userData: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }
}
