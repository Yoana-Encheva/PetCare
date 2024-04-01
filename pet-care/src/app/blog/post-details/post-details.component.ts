import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post = {} as Post;
  isOwner: boolean = false;

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['postId'];
      this.apiService.getPost(id).subscribe((post) => {
        this.post = post;

        if (localStorage.getItem('[user-id]') == post.ownerId) {
          this.isOwner = true;
        }
        console.log(post);
      });
    });
  }
}
