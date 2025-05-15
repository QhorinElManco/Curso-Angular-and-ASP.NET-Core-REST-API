import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddBlogRequestModel} from '@blogpost/models/add-blog-request.model';
import {BlogPost} from '@blogpost/models/blogpost.model';
import {Observable} from 'rxjs';
import {UpdateBlogRequestModel} from '@blogpost/models/update-blog-request.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  private urlBase: string = environment.urlBase;
  private urlBlogPosts: string = `${this.urlBase}/api/blogpost`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
  }

  create(blogpost: AddBlogRequestModel): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.urlBlogPosts, blogpost, {headers: this.getAuthHeaders()});
  }

  getById(id: BlogPost["id"]): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.urlBlogPosts}/${id}`);
  }

  getAll(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.urlBlogPosts);
  }

  update(id: BlogPost["id"], blogpost: UpdateBlogRequestModel): Observable<BlogPost> {
    return this.http.patch<BlogPost>(`${this.urlBlogPosts}/${id}`, blogpost, {headers: this.getAuthHeaders()});
  }

  delete(id: BlogPost["id"]): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${this.urlBlogPosts}/${id}`, {headers: this.getAuthHeaders()});
  }

  getByUrl(url: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.urlBlogPosts}/${url}`);
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.cookieService.get('Authorization')
    });
  }

}
