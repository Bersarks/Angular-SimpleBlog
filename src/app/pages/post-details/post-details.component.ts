import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/data/Content';
import { PostsService } from 'src/app/services/posts.service';
import { Comment } from 'src/app/data/Comment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
  posts: Content[] = [];
  post?: Content;
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute, private postsService: PostsService, private commentsService : CommentsService) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    let postId = parseInt(params['id']);
    this.postsService.getPost(postId).subscribe(post => this.post = post)
    this.commentsService.getCommentsByPost(postId).subscribe(comments => this.comments = comments)
  }
}
