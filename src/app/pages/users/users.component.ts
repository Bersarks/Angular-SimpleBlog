import { Component } from '@angular/core';
import { Users } from '../../data/Users';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  title: string = 'Users';
  users: Users[] = [];
  index: number = 0;
  size: number = 10;
  postCount: number = 0;
  commentCount: number = 0;

  searchText: string = '';
  filterBy: string = '';
  filteredUsers: Users[] = [];

 // Go into detail of user by userId.
  handleEditClick(userId: number) {
    this.router.navigate(['users', userId]);
  }

  // Go to add user page.
  handleAddClick() {
    this.router.navigate(['adduser']);
  }

  constructor(private usersService: UsersService, private router: Router, private activeRoute : ActivatedRoute,
    private postsService: PostsService, private commentsService: CommentsService) {
      const queryParams = this.activeRoute.snapshot.queryParams;
    if (queryParams['p'] !== undefined) {
        this.index = parseInt(queryParams['p']);
    }
   }

   // Getting users array from users service and subscribe to it.
  ngOnInit(): void {
    this.usersService.getUsers().subscribe
    (users => {this.users = users;this.filteredUsers = this.users;});
    this.usersService.getUsersSubject().subscribe
    (users => {this.users = users;this.filteredUsers = this.users;});
  }

 // Getting users array from users service and subscribe to it. When change made.
  ngOnChanges(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    });
    this.usersService.getUsersSubject().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    });
  }

 // Delete user by userId. Check if there is a comment and post by user.
  handleDeleteClick(userId: number | undefined) {
    if (userId !== undefined) {
      this.postsService.getPostsByUser(userId).subscribe(posts => this.postCount = posts.length);
      this.commentsService.getCommentsByUser(userId).subscribe(comments => this.commentCount = comments.length);

      if (this.postCount > 0) {
        alert('Can not delete user with posts');
        return;
      }
      else if (this.commentCount > 0) {
        alert('Can not delete user with comments');
        return;
      }
      else if (userId) {
        this.usersService.deleteUser(userId);
      }
    }
    else {
      alert('User ID can not find');
    }
  }

  // Search user by userId. Search text is taken from input.
  handleSearchTextChange(searchText: string) {
    this.searchText = searchText;
    this.filterUsers();
  }
  filterUsers() {
    this.usersService.getUsers().subscribe
    ((users) => (this.filteredUsers = users));
    if (this.searchText !== '') {
      this.filteredUsers = this.filteredUsers.filter
      ((user) => {return user.userId === +this.searchText;});
    }
  }

 // Go to next page. If there is no next page, alert.
  handleNextClick() {
    const remainingPages = this.users.length % this.size;
    let totalPage: number = Math.floor(this.users.length / this.size);
    if (remainingPages > 0) {
      totalPage++;
    }
    if (this.index + 1 < totalPage) {
      this.index++;
      this.router.navigate(['users'], {queryParams: { i: this.index },});
    } else {
      alert('Last Page!!');
    }
  }
  
// Go to previous page. If there is no previous page, alert.
  handleBackClick() {
    if (this.index > 0) {
      this.index--;
      this.index === 0 ? this.router.navigate(['users']) : this.router.navigate
      (['users'], {queryParams: { i: this.index },});
    } else {
      alert('You are already on the first page!!');
    }
  }

}
