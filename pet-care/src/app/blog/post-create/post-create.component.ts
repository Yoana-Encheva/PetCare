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
  constructor(private apiService: ApiService, private router: Router) {}

  createPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { title, content } = form.value;

    this.apiService.createPost(title, content).subscribe((data) => {
      this.router.navigate(['/blog', data.objectId, 'details']);
    });
  }
}
