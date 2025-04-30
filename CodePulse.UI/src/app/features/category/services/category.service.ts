import {Injectable} from '@angular/core';
import {AddCategoryRequest} from '../models/add-category-request.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category.model';
import {UpdateCategoryRequestModel} from '../models/update-category-request.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlBase: string = environment.urlBase;
  private urlCategories: string = `${this.urlBase}/api/category`;
  constructor(private http: HttpClient) {
  }

  addCategory(category: AddCategoryRequest): Observable<Category> {
    return this.http.post<Category>(this.urlCategories, category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlCategories);
  }

  getCategoryById(id: Category["id"]) : Observable<Category> {
    return this.http.get<Category>(`${this.urlCategories}/${id}`);
  }

  updateCategory(id: Category['id'], category: UpdateCategoryRequestModel): Observable<Category> {
    return this.http.put<Category>(`${this.urlCategories}/${id}`, category);
  }

  deleteCategory(id: Category['id']): Observable<Category> {
    return this.http.delete<Category>(`${this.urlCategories}/${id}`);
  }
}
