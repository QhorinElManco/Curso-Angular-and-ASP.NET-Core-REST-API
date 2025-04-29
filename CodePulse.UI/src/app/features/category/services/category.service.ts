import {Injectable} from '@angular/core';
import {AddCategoryRequest} from '../models/add-category-request.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  addCategory(category: AddCategoryRequest): Observable<Category> {
    return this.http.post<Category>('http://localhost:5000/api/category', category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:5000/api/category');
  }

  getCategoryById(id: Category["id"]) : Observable<Category> {
    return this.http.get<Category>(`http://localhost:5000/api/category/${id}`);
  }
}
