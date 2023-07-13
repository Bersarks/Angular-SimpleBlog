import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { contents } from 'src/app/data/content_data';
import { Content } from 'src/app/data/Content';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Content[] = contents;
  private postsSubject: Subject<Content[]> = new Subject<Content[]>();

  constructor() { }

  getPosts(): Observable<Content[]> {
    return of(this.posts);
  }

  getPostsByUser(id: number): Observable<Content[]> {
    const posts = this.posts.filter(post => post.userId === id)
    return of(posts)
  }

  getPostsByCategory(id: number): Observable<Content[]> {
    const posts = this.posts.filter(post => post.categoryId === id)
    return of(posts)
  }

  addPost(newPost: Content): void {
    this.posts.push(newPost);
    this.postsSubject.next(this.posts);
  }

  getPostsSubject(): Observable<Content[]> {
    return this.postsSubject.asObservable();
  }

  getPost(postId: number): Observable<Content | undefined> {
    const post = this.posts.find((post: Content) => post.postId === postId )
    return of(post)
  }

  deletePost(postId: number): void {
    const index = this.posts.findIndex(post => post.postId === postId);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }
  }
}
