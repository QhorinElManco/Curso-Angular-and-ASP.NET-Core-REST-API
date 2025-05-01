import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AddBlogRequestModel} from '../models/add-blog-request.model';
import {CommonModule, DatePipe} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {BlogpostService} from '../services/blogpost.service';
import {Router} from '@angular/router';
import {MarkdownComponent} from 'ngx-markdown';
import {CategoryService} from '../../category/services/category.service';
import {Category} from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  imports: [
    FormsModule,
    DatePipe,
    MarkdownComponent,
    CommonModule
  ],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy, OnInit {
  model: AddBlogRequestModel;
  private addBlogpostSubscription?: Subscription;
  categories$: Observable<Category[]> = new Observable<Category[]>();

  constructor(
    private blogService: BlogpostService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.model = {
      author: '',
      content: '',
      featuredImageUrl: '',
      isPublished: true,
      publishedOn: new Date(),
      shortDescription: '',
      urlHandle: '',
      title: '',
      categories: []
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
  }


  onFormSubmit() {
    this.addBlogpostSubscription = this.blogService.create(this.model).subscribe({
      next: () => this.router.navigateByUrl("/admin/blogposts"),
      error: (error) => console.log(error)
    })
  }

  ngOnDestroy(): void {
    this.addBlogpostSubscription?.unsubscribe();
  }

}
