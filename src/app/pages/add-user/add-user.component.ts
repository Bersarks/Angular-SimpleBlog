import { Component } from '@angular/core';
import { Users } from 'src/app/data/Users';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  reservedIds : number = 0
  newUser : Users = {
    userId: 0,
    username: '',
    email: '',
    creationDate: '',
    isActive: false
  };
  
  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { 
    this.usersService.getUsers().subscribe(users => this.reservedIds = users.length);
    this.newUser.userId = this.reservedIds + 1;
    }

// Add new user to users array and go to users page.
//Check if all fields are filled.
//Check if userId is taken.
  addUser() {
    if (this.newUser.username === '' || this.newUser.email === ''
     || this.newUser.creationDate === '' || this.newUser.userId === undefined) {
      alert('Please fill all the fields');
      return;
     }
     else if(this.newUser.userId <= this.reservedIds || 
      this.newUser.userId === undefined) {
        alert('User ID is already taken or wrong');
        return;
      }
    this.usersService.addUser(this.newUser);
    this.router.navigate(['users']);
  }
}
