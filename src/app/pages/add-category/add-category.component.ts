import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/data/Category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  maxCategoryId: number = 0;
  newCategory : Category = {
    categoryId: 0,
    name: '',
    creationDate: '',
  };

  constructor(private categoriesService: CategoriesService, private route: ActivatedRoute, private router: Router) { 
    this.categoriesService.getCategories().subscribe(categories => this.maxCategoryId = categories.length + 1);
    this.newCategory.categoryId = this.maxCategoryId;
  }

  addCategory() {
    if (this.newCategory.name === '' || this.newCategory.creationDate === '' || this.newCategory.categoryId === undefined) {
      alert('Please fill all the fields');
      return;
    }
    else if (this.newCategory.categoryId <= 0 || this.newCategory.categoryId > this.maxCategoryId){
      alert('Category ID is wrong');
      return;
    }
    this.categoriesService.addCategory(this.newCategory);
    this.router.navigate(['category']);
  }

}
