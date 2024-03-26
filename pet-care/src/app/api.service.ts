import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './types/post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`api/posts`);
  }

  getPost(id: string) {
    return this.http.get<Post>(`api/posts/${id}`);
  }

  createPost(title: string, content: string) {
    return this.http.post<Post>(`api/posts`, { title, content });
  }
}
