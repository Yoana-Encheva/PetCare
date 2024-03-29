import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userName(): string {
    return this.userService.user?.name || '';
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        localStorage.removeItem('[user]');
        this.userService.setUserData(null);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // this.isLoading = false;
        console.log('Error: ', err);
      },
    });
    this.router.navigate(['/home']);
  }
}
