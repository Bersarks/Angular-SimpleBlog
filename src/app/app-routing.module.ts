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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
