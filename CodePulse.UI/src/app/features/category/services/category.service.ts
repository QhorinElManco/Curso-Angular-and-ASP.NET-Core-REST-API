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

  create(category: AddCategoryRequest): Observable<Category> {
    return this.http.post<Category>(this.urlCategories, category);
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlCategories);
  }

  getById(id: Category["id"]) : Observable<Category> {
    return this.http.get<Category>(`${this.urlCategories}/${id}`);
  }

  update(id: Category['id'], category: UpdateCategoryRequestModel): Observable<Category> {
    return this.http.put<Category>(`${this.urlCategories}/${id}`, category);
  }

  delete(id: Category['id']): Observable<Category> {
    return this.http.delete<Category>(`${this.urlCategories}/${id}`);
  }
}
