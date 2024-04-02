import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post = {} as Post;
  loading: boolean = false;
  errored: boolean = false;
  isOwner: boolean = false;

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.activeRoute.params.subscribe((data) => {
      this.apiService.getPost(data['postId']).subscribe({
        next: (post) => {
          this.post = post;

          if (localStorage.getItem('[user-id]') == post.ownerId) {
            this.isOwner = true;
          }

          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.router.navigate(['/404']);
        },
      });
    });
  }

  deletePost() {
    if (!this.isOwner) {
      return;
    }

    this.loading = true;

    this.apiService.deletePost(this.post.objectId).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/blog']);
      },
      error: () => {
        this.loading = false;
        this.errored = true;
      },
    });
  }
}
