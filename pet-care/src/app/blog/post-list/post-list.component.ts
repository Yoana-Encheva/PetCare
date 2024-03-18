import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/post';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = true;

  constructor(private api: ApiService, private userService: UserService) {}

  get userId(): string {
    return this.userService.user?.objectId || '';
  }

  ngOnInit(): void {
    this.api.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error: ', err);
      },
    });
  }
}
