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

  createPost(
    title: string,
    content: string,
    imageUrl: string,
    category: string
  ) {
    return this.http.post<Post>(`api/posts`, {
      title,
      content,
      imageUrl: imageUrl || '',
      category: category || 'General',
      ownerId: localStorage.getItem('[user-id]' || null),
    });
  }

  updatePost(postData: Post) {
    return this.http.put<Post>(`api/posts/${postData.objectId}`, postData);
  }

  deletePost(id: string) {
    return this.http.delete<Post>(`api/posts/${id}`);
  }
}
