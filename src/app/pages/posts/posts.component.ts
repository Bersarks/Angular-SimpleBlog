import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/data/Content';
import { PostsService } from 'src/app/services/posts.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  title: string = 'Posts';
  posts: Content[] = [];
  commentCount: number = 0;
  
  searchText: string = '';
  filteredContent: Content[] = [];

  constructor(private postService: PostsService, private router: Router, private route: ActivatedRoute,
    private commentsService: CommentsService) {
    
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    if(queryParams['i'] !== undefined){
      this.index = parseInt(queryParams['i'])
    }
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
    this.postService
      .getPosts()
      .subscribe((posts) => (this.filteredContent = posts));
  }
  
  ngOnChange(){
    const queryParams = this.route.snapshot.queryParams;
    if(queryParams['i'] !== undefined){
      this.index = parseInt(queryParams['i'])
    }
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
    this.postService
      .getPosts()
      .subscribe((posts) => (this.filteredContent = posts));
  }

  handleDeleteClick(postId: number | undefined) {
    if (postId !== undefined) {
      this.commentsService.getCommentsByPost(postId).subscribe(comments => this.commentCount = comments.length);
      if (this.commentCount > 0) {
        alert('Can not delete post with comments');
        return;
      }
      else if (postId) {
        this.postService.deletePost(postId);
      }
      else {
        alert('Post ID can not find');
      }
    }
    else {
      alert('Post ID can not find');
    }
  }

  filterData() {
    if (this.searchText === '') {
      this.postService
        .getPosts()
        .subscribe((posts) => (this.filteredContent = posts));
    } else {
      this.filteredContent = this.posts.filter((post) => {
        return post.postId === +this.searchText;
      });
    }
  }

  handleSearchTextChange(searchText: string) {
    this.router.navigate(['posts'], {
      queryParams: { postId: this.searchText },
    });
    this.filterData();
  }

  index: number = 0;
  size: number = 10;
  isNextDisabled: boolean = false;
  isPrevDisabled: boolean = false;

  handleBackClick() {
    if (this.index > 0) {
      this.index--;
      this.isNextDisabled = false;
      this.index === 0
        ? this.router.navigate(['posts'])
        : this.router.navigate(['posts'], {
            queryParams: { i: this.index },
          });
    } else {
      alert('You are already on first page!');
    }
  }

  handleNextClick() {
    const remainingPages = this.posts.length % this.size;
    let totalPage: number = Math.floor(this.posts.length / this.size);

    if (remainingPages > 0) {
      totalPage++;
    }
    if (this.index + 1 < totalPage) {
      this.index++;
      this.router.navigate(['posts'], {
        queryParams: { i: this.index },
      });
      this.isPrevDisabled = false;
    } else {
      alert('You are already at last page!!');
    }
  }

  handleEditClick(postId: number) {
    this.router.navigate(['posts', postId]);
  }

  handleAddClick() {
    this.router.navigate(['addpost']);
  }
}
