import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Comment } from 'src/app/data/Comment';
import { comments } from 'src/app/data/comment_data';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments: Comment[] = comments
  private commentSubject: Subject<Comment[]> = new Subject<Comment[]>()

  constructor() { }

  getComments(): Observable<Comment[]>{
    return of(this.comments)
  }

  getCommentById(commentId: number): Observable<Comment | undefined> {
 const comment = this.comments.find((comment: Comment) => (comment.commentId === commentId))
 return of(comment);
  }

  addComment(newComment: Comment) {
    this.comments.push(newComment);
    this.commentSubject.next(this.comments);
  }

  deleteComment(commentId: number){
    const index = this.comments.findIndex(comment => comment.commentId === commentId)
    if (index !== -1) {
      this.comments.splice(index, 1);
    }
  }
  
  getCommentsByPost(id: number): Observable<Comment[]>{
    const comments = this.comments.filter(comment => comment.postId === id)
    return of(comments)
  }
  
  getCommentsByUser(id: number): Observable<Comment[]>{
    const comments = this.comments.filter(comment => comment.userId === id)
    return of(comments)
  }
}
