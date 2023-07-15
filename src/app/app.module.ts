import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './pages/users/users.component';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { CommentDetailComponent } from './pages/comment-detail/comment-detail.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    FooterComponent,
    UsersComponent,
    UserDetailsComponent,
    PostsComponent,
    PostDetailsComponent,
    CommentsComponent,
    CommentDetailComponent,
    CategoryComponent,
    CategoryDetailComponent,
    AddUserComponent,
    AddPostComponent,
    AddCommentComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
