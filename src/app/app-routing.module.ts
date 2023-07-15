import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { MainComponent } from './pages/main/main.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { CommentDetailComponent } from './pages/comment-detail/comment-detail.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/:id', component: UserDetailsComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'posts/:id', component: PostDetailsComponent},
  { path: 'comments', component: CommentsComponent},
  { path: 'comments/:id', component: CommentDetailComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'category/:id', component: CategoryDetailComponent},
  { path: 'adduser', component : AddUserComponent},
  { path: 'addcomment', component : AddCommentComponent},
  { path: 'addpost', component : AddPostComponent},
  { path: 'addcategory', component : AddCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
