import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Users } from '../data/Users';
import { users } from '../data/users_data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: Users[] = [] = users;
  private usersSubject = new Subject<Users[]>();

  constructor() { }

  getUsers(): Observable<Users[]> {
    return of(this.users);
  }

  addUser(newUser : Users) {
    this.users.push(newUser);
    this.usersSubject.next(this.users);
  }

  getUsersSubject(): Observable<Users[]> {
    return this.usersSubject.asObservable();
  }

  getUserById(userId: number): Observable<Users | undefined> {
    return of(this.users.find(user => user.userId === userId));
  }

  deleteUser(userId: number) {
    const index = this.users.findIndex(user => user.userId === userId);
    if (index !== -1) {
      if (this.users.length !== 1){
        this.users.splice(index, 1);
        this.usersSubject.next(this.users);
      }
      else {
        alert('Can not delete the last user');
      }
    }
  }
}
