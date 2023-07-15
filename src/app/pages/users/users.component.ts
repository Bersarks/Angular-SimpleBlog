import { Component } from '@angular/core';
import { Users } from '../../data/Users';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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

  searchText: string = '';
  filterBy: string = '';
  filteredUsers: Users[] = [];

  handleEditClick(userId: number) {
    this.router.navigate(['users', userId]);
  }
  
  handleAddClick() {
    this.router.navigate(['adduser']);
  }
  constructor(private usersService: UsersService, private router: Router, private activeRoute : ActivatedRoute) {
      const queryParams = this.activeRoute.snapshot.queryParams;
    if (queryParams['p'] !== undefined) {
        this.index = parseInt(queryParams['p']);
    }
   }
  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    });
    this.usersService.getUsersSubject().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    });
  }

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

  handleDeleteClick(userId: number | undefined) {
    if (userId) {
      this.usersService.deleteUser(userId);
    } else {
      alert('User ID can not find');
    }
  }
  
  handleSearchTextChange(searchText: string) {
    this.searchText = searchText;
    this.filterUsers();
  }
  filterUsers() {
    if (this.searchText === '') {
      this.usersService
        .getUsers()
        .subscribe((users) => (this.filteredUsers = users));
    } else {
      this.filteredUsers = this.users.filter((user) => {
        return user.userId === +this.searchText;
      });
    }
  }

  handleNextClick() {
    const remainingPages = this.users.length % this.size;
    let totalPage: number = Math.floor(this.users.length / this.size);
    if (remainingPages > 0) {
      totalPage++;
    }
    if (this.index + 1 < totalPage) {
      this.index++;
      this.router.navigate(['users'], {
        queryParams: { i: this.index },
      });
    } else {
      alert('Last Page!!');
    }
  }

  handleBackClick() {
    if (this.index > 0) {
      this.index--;
      this.index === 0
        ? this.router.navigate(['users'])
        : this.router.navigate(['users'], {
            queryParams: { i: this.index },
          });
    } else {
      alert('You are already on the first page!!');
    }
  }

}
