import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/data/Comment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  title: string = 'comments';
  comments: Comment[] = [];

  searchText: string = '';
  filteredContent: Comment[] = [];

  constructor(private commentService: CommentsService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    if(queryParams['i'] !== undefined){
      this.index = parseInt(queryParams['i'])
    }
    this.commentService.getComments().subscribe((comments) => (this.comments = comments));
    this.commentService
      .getComments()
      .subscribe((comments) => (this.filteredContent = comments));
  }

  handleDeleteClick(commentId: number | undefined) {
    if (commentId) {
      this.commentService.deleteComment(commentId);
    } else {
      alert('Post ID can not find');
    }
  }

  filterData() {
    if (this.searchText === '') {
      this.commentService
        .getComments()
        .subscribe((comments) => (this.filteredContent = comments));
    } else {
      this.filteredContent = this.comments.filter((comment) => {
        return comment.commentId === +this.searchText;
      });
    }
  }

  handleSearchTextChange(searchText: string) {
    this.router.navigate(['comments'], {
      queryParams: { commentId: this.searchText },
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
        ? this.router.navigate(['comments'])
        : this.router.navigate(['comments'], {
            queryParams: { i: this.index },
          });
    } else {
      alert('You are already on first page!');
    }
  }

  handleNextClick() {
    const remainingPages = this.comments.length % this.size;
    let totalPage: number = Math.floor(this.comments.length / this.size);

    if (remainingPages > 0) {
      totalPage++;
    }
    if (this.index + 1 < totalPage) {
      this.index++;
      this.router.navigate(['comments'], {
        queryParams: { i: this.index },
      });
      this.isPrevDisabled = false;
    } else {
      alert('You are already at last page!!');
    }
  }
  handleEditClick(commentId: number | undefined) {
    this.router.navigate(['comments', commentId]);
  }
}
