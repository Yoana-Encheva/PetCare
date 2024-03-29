import { Injectable, OnDestroy } from '@angular/core';
import { User, UserDetails } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserDetails | null>(null);
  private user$ = this.user$$.asObservable();

  user: UserDetails | null = null;
  userSubscription: Subscription;

  USER_KEY = '[user-id]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserDetails>('client/login', {
        login: email,
        password,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post<UserDetails>('client/register', {
        name,
        email,
        password,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .get('client/logout', {
        headers: { 'user-token': this.user?.['user-token'] || '' },
      })
      .pipe(tap(() => this.user$$.next(null)));
  }

  getProfile() {
    const userId = localStorage.getItem('[user-id]') || '';
    return this.http
      .get<UserDetails>(`api/users/${userId}`)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(userData: User) {
    localStorage.setItem('[user-id]', JSON.stringify(userData));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
