import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  loading: boolean = false;
  errored: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  createPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.loading = true;

    const { title, content, imageUrl, category } = form.value;

    this.apiService.createPost(title, content, imageUrl, category).subscribe({
      next: (data) => {
        this.loading = false;
        this.router.navigate(['/blog', data.objectId, 'details']);
      },
      error: () => {
        this.loading = false;
        this.errored = true;
      },
    });
  }
}
