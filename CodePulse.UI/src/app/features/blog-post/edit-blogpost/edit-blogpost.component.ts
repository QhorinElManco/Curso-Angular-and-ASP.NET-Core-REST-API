import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {BlogpostService} from '@blogpost/services/blogpost.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MarkdownComponent} from 'ngx-markdown';
import {Category} from '@category/models/category.model';
import {CategoryService} from '@category/services/category.service';
import {UpdateBlogRequestModel} from '@blogpost/models/update-blog-request.model';
import {BlogPost} from '@blogpost/models/blogpost.model';

@Component({
  selector: 'app-edit-blogpost',
  imports: [
    AsyncPipe,
    DatePipe,
    FormsModule,
    MarkdownComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  blogpost?: BlogPost;
  paramsSubscrition?: Subscription;
  editPostSubscription?: Subscription;
  deletePostSubscription?: Subscription;
  categories$: Observable<Category[]> = new Observable<Category[]>();
  selectedCategories: Category["id"][] = [];


  constructor(
    private blogpostService: BlogpostService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.paramsSubscrition = this.route.paramMap.subscribe(
      {
        next: (params) => {
          this.id = params.get('id');
          if (this.id) {
            this.blogpostService.getById(this.id)
              .subscribe(
                {
                  next: (blog) => {
                    this.blogpost = blog;
                    this.categories$ = this.categoryService.getAll();
                    this.selectedCategories = blog.categories.map(category => category.id);
                  },
                  error: (error) => console.log(error)
                }
              )
          }
        }
      }
    )
  }

  onFormSubmit(): void {
    const updateBlogRequest: UpdateBlogRequestModel = {
      author: this.blogpost?.author ?? "",
      content: this.blogpost?.content ?? "",
      featuredImageUrl: this.blogpost?.featuredImageUrl ?? "",
      isPublished: this.blogpost?.isPublished ?? false,
      publishedOn: this.blogpost?.publishedOn ?? new Date(),
      shortDescription: this.blogpost?.shortDescription ?? "",
      title: this.blogpost?.title ?? "",
      urlHandle: this.blogpost?.urlHandle ?? "",
      categories: this.selectedCategories
    }

    if (this.id && this.blogpost) {
      this.editPostSubscription = this.blogpostService.update(this.id, updateBlogRequest).subscribe({
        next: () => this.router.navigateByUrl("/admin/blogposts"),
        error: (error) => console.log(error)
      });
    }
  }

  onDelete() {
    this.deletePostSubscription = this.blogpostService.delete(this.id!).subscribe({
      next: () => this.router.navigateByUrl("/admin/blogposts"),
      error: (error) => console.log(error)
    })
  }

  ngOnDestroy() {
    this.paramsSubscrition?.unsubscribe();
    this.editPostSubscription?.unsubscribe();
    this.deletePostSubscription?.unsubscribe();
  }

  onCategoriesChange($event: Category["id"][]) {
    this.selectedCategories = $event;
  }
}
