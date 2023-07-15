import { Component,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/data/Users';
import { UsersService } from 'src/app/services/users.service';
import { PostsService } from 'src/app/services/posts.service';
import { Content } from 'src/app/data/Content';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  users: Users[] = [];
  user?: Users;
  posts: Content[] = [];
  constructor(private route: ActivatedRoute,
    private usersService: UsersService, private postsService: PostsService) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    let userId = parseInt(params['id']);
    this.usersService.getUserById(userId).subscribe(user => this.user = user);
    this.postsService.getPostsByUser(userId).subscribe(posts => this.posts = posts)
  }

  ngOnChange(): void {
    const params = this.route.snapshot.params;
    let userId = parseInt(params['id']);
    this.usersService.getUserById(userId).subscribe(user => this.user = user);
    this.postsService.getPostsByUser(userId).subscribe(posts => this.posts = posts)
  }
}
