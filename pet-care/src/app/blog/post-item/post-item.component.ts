import { Component, Input } from '@angular/core';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent {
  @Input('post') post = {} as Post;
}
