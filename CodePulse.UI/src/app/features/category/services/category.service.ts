import {Injectable} from '@angular/core';
import {AddCategoryRequest} from '@category/models/add-category-request.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '@category/models/category.model';
import {UpdateCategoryRequestModel} from '@category/models/update-category-request.model';
import {environment} from '@env/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlBase: string = environment.urlBase;
  private urlCategories: string = `${this.urlBase}/api/category`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
  }

  create(category: AddCategoryRequest): Observable<Category> {
    return this.http.post<Category>(this.urlCategories, category, {
      headers: this.getAuthHeaders()
    });
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlCategories);
  }

  getById(id: Category["id"]): Observable<Category> {
    return this.http.get<Category>(`${this.urlCategories}/${id}`);
  }

  update(id: Category['id'], category: UpdateCategoryRequestModel): Observable<Category> {
    return this.http.put<Category>(`${this.urlCategories}/${id}`, category, {
      headers: this.getAuthHeaders()
    });
  }

  delete(id: Category['id']): Observable<Category> {
    return this.http.delete<Category>(`${this.urlCategories}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.cookieService.get('Authorization')
    });
  }
}
