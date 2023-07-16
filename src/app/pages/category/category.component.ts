import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/data/Category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  title: string = 'category';
  categories: Category[] = [];

  searchText: string = '';
  filteredContent: Category[] = [];

  constructor(private categoryService: CategoriesService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    if(queryParams['i'] !== undefined){
      this.index = parseInt(queryParams['i'])
    }
    this.categoryService.getCategories().subscribe((categories) => (this.categories = categories));
    this.categoryService
      .getCategories()
      .subscribe((comments) => (this.filteredContent = comments));
  }
  
  ngOnChange(): void {
    const queryParams = this.route.snapshot.queryParams;
    if(queryParams['i'] !== undefined){
      this.index = parseInt(queryParams['i'])
    }
    this.categoryService.getCategories().subscribe((categories) => (this.categories = categories));
    this.categoryService
      .getCategories()
      .subscribe((comments) => (this.filteredContent = comments));
  }
  handleDeleteClick(categoryId: number | undefined) {
    if (categoryId) {
      this.categoryService.deleteCategory(categoryId);
    } else {
      alert('Category ID can not find');
    }
  }

  filterData() {
    this.categoryService.getCategories().subscribe
    ((categories) => (this.filteredContent = categories));
    if (this.searchText !== '') {
      this.filteredContent = this.filteredContent.filter
      ((category) => {return category.categoryId === +this.searchText;});
    }
  }

  handleSearchTextChange(searchText: string) {
    this.router.navigate(['category'], {
      queryParams: { categoryId: this.searchText },
    });
    this.filterData();
  }

  index: number = 0;
  size: number = 10;
  isNextDisabled: boolean = false;
  isPrevDisabled: boolean = false;

  handleBackClick() {
    if (this.index > 0) {
      this.index--;
      this.isNextDisabled = false;
      this.index === 0
        ? this.router.navigate(['category'])
        : this.router.navigate(['category'], {
            queryParams: { i: this.index },
          });
    } else {
      alert('You are already on first page!');
    }
  }

  handleNextClick() {
    const remainingPages = this.categories.length % this.size;
    let totalPage: number = Math.floor(this.categories.length / this.size);

    if (remainingPages > 0) {
      totalPage++;
    }
    if (this.index + 1 < totalPage) {
      this.index++;
      this.router.navigate(['category'], {
        queryParams: { i: this.index },
      });
      this.isPrevDisabled = false;
    } else {
      alert('You are already at last page!!');
    }
  }
  
  handleEditClick(categoryId: number | undefined) {
    this.router.navigate(['category', categoryId]);
  }
  
  handleAddClick() {
    this.router.navigate(['addcategory']);
  }
}
