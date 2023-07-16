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
  searchText1: string = '';
  searchText2: string = '';
  filteredContent: Comment[] = [];

  constructor(private commentService: CommentsService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    if(queryParams['i'] !== undefined){
      this.index = parseInt(queryParams['i'])
    }
    this.commentService.getComments().subscribe
    ((comments) => (this.comments = comments));

    this.commentService.getComments().subscribe
      ((comments) => (this.filteredContent = comments));
  }
  
  ngOnChange(){
    const queryParams = this.route.snapshot.queryParams;
    if(queryParams['i'] !== undefined){
      this.index = parseInt(queryParams['i'])
    }
    this.commentService.getComments().subscribe
    ((comments) => (this.comments = comments));

    this.commentService.getComments().subscribe
      ((comments) => (this.filteredContent = comments));
  }

  handleDeleteClick(commentId: number | undefined) {
    if (commentId) {
      this.commentService.deleteComment(commentId);
    } else {
      alert('Post ID can not find');
    }
  }

  filterData() {
    this.commentService.getComments().subscribe
      ((comments) => (this.filteredContent = comments));
    if (this.searchText !== '') {
      this.filteredContent = this.filteredContent.filter
      ((comment) => {return comment.userId === +this.searchText;});
    }
    if ( this.searchText1 !== ''){
      this.filteredContent = this.filteredContent.filter
      ((comment) => {return comment.postId === +this.searchText1;});
    }
    if ( this.searchText2 !== ''){
      this.filteredContent = this.filteredContent.filter
      ((comment) => {return comment.commentId === +this.searchText2;});
    }
  }


  handleSearchTextChange(searchText: string) {
    this.router.navigate(['comments'], {
      queryParams: {commentId: this.searchText,
         postId: this.searchText1, userId: this.searchText2 },
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
      this.index === 0 ? this.router.navigate(['comments']) :
       this.router.navigate(['comments'], 
       { queryParams: { i: this.index },});
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
      this.router.navigate(['comments'],
      {queryParams: { i: this.index },});
    } else {
      alert('You are already at last page!!');
    }
  }
  
  handleEditClick(commentId: number | undefined) {
    this.router.navigate(['comments', commentId]);
  }
  
  handleAddClick() {
    this.router.navigate(['addcomment']);
  }
}
