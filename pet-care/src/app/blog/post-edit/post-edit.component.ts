import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiService } from 'src/app/api.service';

import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  post = {} as Post;
  loading: boolean = false;
  errored: boolean = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
    imageUrl: [''],
    category: [''],
  });

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.activeRoute.params.subscribe((data) => {
      this.apiService.getPost(data['postId']).subscribe({
        next: (post) => {
          this.post = post;

          if (!(localStorage.getItem('[user-id]') == post.ownerId)) {
            this.router.navigate(['/404']);
          }

          this.form.setValue({
            title: post.title,
            content: post.content,
            imageUrl: post.imageUrl,
            category: post.category,
          });

          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.router.navigate(['/404']);
        },
      });
    });
  }

  cancel(): void {
    this.form.setValue({
      title: this.post.title,
      content: this.post.content,
      imageUrl: this.post.imageUrl,
      category: this.post.category,
    });
  }

  updatePost(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.apiService
      .updatePost({ ...this.post, ...this.form.value } as Post)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/blog', this.post.objectId, 'details']);
        },
        error: () => {
          this.loading = false;
          this.errored = true;
        },
      });
  }
}
