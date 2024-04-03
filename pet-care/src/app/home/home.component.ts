import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Post } from '../types/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  get userId(): string {
    return this.userService.user?.objectId || '';
  }

  ngOnInit(): void {
    this.api.getLatestPosts().subscribe({
      next: (posts) => {
        this.posts = posts.slice(0, 3);
      },
    });
  }

  navigate() {
    this.userId
      ? this.router.navigate(['/blog', 'create'])
      : this.router.navigate(['/user', 'login']);
  }
}
