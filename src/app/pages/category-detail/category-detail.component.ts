import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/data/Category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Content } from 'src/app/data/Content';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent {
  categories: Category[] = [];
  category?: Category;
  posts: Content[] = [];
  post?: Content;
  postCount : number = 0;

  constructor(private route: ActivatedRoute, private categoryService: CategoriesService , private postsService : PostsService) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    let commentId = parseInt(params['id']);
    this.categoryService.getCategory(commentId).subscribe
    (category => this.category = category);
    this.postsService.getPosts().subscribe(post => this.posts = post);
    this.postCount = this.posts.filter(post => post.categoryId === commentId).length;
  }
}
