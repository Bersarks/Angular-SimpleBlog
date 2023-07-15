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
    this.usersService.getUsers().subscribe(users => this.reservedIds = users.length + 1);
    this.newUser.userId = this.reservedIds;
    }

  // zaten dışarıdan elle user id değiştirilebildiği için saçma gelse de burda en azından var olan id girilmesini engelledim.
  // ayrıca user id girilmediğinde de hata vermesini sağladım.
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
