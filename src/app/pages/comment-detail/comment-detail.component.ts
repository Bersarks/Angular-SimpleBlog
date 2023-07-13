import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/data/Comment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent {
  comments: Comment[] = [];
  comment?: Comment;

  constructor(private route: ActivatedRoute, private commentsService : CommentsService) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    let commentId = parseInt(params['id']);
    this.commentsService.getCommentById(commentId).subscribe(comments => this.comment = comments)
  }
}
