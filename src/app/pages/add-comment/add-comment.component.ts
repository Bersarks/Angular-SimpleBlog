import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/data/Comment';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  maxCommentID: number = 0;
  maxUserID: number = 0;
  maxPostID: number = 0;

  newComment : Comment = {
    commentId: 0,
    postId: 0,
    userId: 0,
    comment: '',
    creationDate: '',
    isConfirmed: false
  }

  constructor(private commentsService: CommentsService, private route: ActivatedRoute, private router: Router,
    private postsService: PostsService, private usersService: UsersService) {
    this.commentsService.getComments().subscribe(comments => this.maxCommentID = comments.length);
    this.postsService.getPosts().subscribe(posts => this.maxPostID = posts.length);
    this.usersService.getUsers().subscribe(users => this.maxUserID = users.length);
    this.newComment.commentId = this.maxCommentID + 1;
  }

  addComment() {
    if (this.newComment.comment === '' || this.newComment.creationDate === '' || this.newComment.postId === undefined
    || this.newComment.userId === undefined || this.newComment.commentId === undefined) {
      alert('Please fill all the fields');
      return;
    }
    else if (this.newComment.commentId <= 0 || this.newComment.commentId <= this.maxCommentID){
      alert('Comment ID is wrong');
      return;
    }
    else if (this.newComment.postId <= 0 || this.newComment.postId > this.maxPostID){
      alert('Post ID is wrong');
      return;
    }
    else if (this.newComment.userId <= 0 || this.newComment.userId > this.maxUserID){
      alert('User ID is wrong');
      return;
    }
    this.commentsService.addComment(this.newComment);
    this.router.navigate(['comments']);
  }

}
