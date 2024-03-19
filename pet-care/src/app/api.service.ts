import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';

import { Post } from './types/post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts() {
    const { apiUrl } = environment;

    return this.http.get<Post[]>(`${apiUrl}/posts`);
  }

  getPost(id: string) {
    const { apiUrl } = environment;

    return this.http.get<Post>(`${apiUrl}/posts/${id}`);
  }

  createPost(title: string, content: string) {
    const { apiUrl } = environment;

    return this.http.post<Post[]>(`${apiUrl}/posts`, { title, content });
  }
}
