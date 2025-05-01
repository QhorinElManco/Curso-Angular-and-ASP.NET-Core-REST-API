import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AddBlogRequestModel} from '../models/add-blog-request.model';
import {BlogPost} from '../models/blogpost.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  private urlBase: string = environment.urlBase;
  private urlBlogPosts: string = `${this.urlBase}/api/blogpost`;

  constructor(private http: HttpClient) {
  }

  create(blogpost: AddBlogRequestModel): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.urlBlogPosts, blogpost);
  }

  getById(id: BlogPost["id"]): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.urlBlogPosts}/${id}`);
  }

  getAll(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.urlBlogPosts);
  }
}
