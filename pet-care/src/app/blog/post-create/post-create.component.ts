import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  constructor(private apiService: ApiService) {}

  createPost(title: string, content: string) {
    this.apiService.createPost(title, content).subscribe((data) => {
      console.log({ data });
    });
  }
}
