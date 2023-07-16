import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/data/Content';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { elementAt } from 'rxjs'; // bakılacak

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  maxUserID: number = 0;
  maxCategoryID: number = 0;
  maxPostID: number = 0;
  newPost : Content = {
    postId: 0,
    userId: 0,
    categoryId: 0,
    title: '',
    content: '',
    creationDate: '',
    viewCount: 0,
    isPublished : false
  };

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router,
    private postsService: PostsService, private categoriesService: CategoriesService) { 
    this.postsService.getPosts().subscribe(posts => this.newPost.postId = posts.length + 1);
    this.postsService.getPosts().subscribe(posts => this.maxPostID = posts.length + 1);
    this.usersService.getUsers().subscribe(users => this.maxUserID = users.length);
    this.categoriesService.getCategories().subscribe(categories => this.maxCategoryID = categories.length);
  }
  
  addPost() {
    if (this.newPost.content === '' || this.newPost.title === '' ||
    this.newPost.creationDate === ''){
      alert('Please fill all the fields');
      return;
    }
    else if (this.newPost.userId <= 0 || this.newPost.userId > this.maxUserID){
      alert('User ID is wrong');
      return;
    }
    else if (this.newPost.categoryId <= 0 || this.newPost.categoryId > this.maxCategoryID){
      alert('Category ID is wrong');
      return;
    }
    else if (this.newPost.postId <= 0 || this.newPost.postId > this.maxPostID){
      alert('Post ID is wrong');
      return;
    }
    this.postsService.addPost(this.newPost);
    this.router.navigate(['posts']);
  }
}
