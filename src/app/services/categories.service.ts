import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Category } from 'src/app/data/Category';
import { categories } from 'src/app/data/category_data';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: Category[] = categories;
  private categoriesSubject: Subject<Category[]> = new Subject<Category[]>();

  constructor() { }

  getCategories(): Observable<Category[]> {
    return of(this.categories)
  }

  addCategory(newCategory: Category): void {
    this.categories.push(newCategory);
    this.categoriesSubject.next(this.categories)
  }
  

  getCategory(categoryId: number): Observable<Category | undefined>{
    const category = this.categories.find(category => category.categoryId = categoryId)
    return of(category)
  }

  getCategoriesSubject(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  deleteCategory(id:number): void {
    const index = this.categories.findIndex(category => category.categoryId === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }
}
