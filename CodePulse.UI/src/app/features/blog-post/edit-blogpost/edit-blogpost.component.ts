import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {BlogpostService} from '@blogpost/services/blogpost.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MarkdownComponent} from 'ngx-markdown';
import {Category} from '@category/models/category.model';
import {CategoryService} from '@category/services/category.service';
import {UpdateBlogRequestModel} from '@blogpost/models/update-blog-request.model';
import {BlogPost} from '@blogpost/models/blogpost.model';
import {ImageSelectorComponent} from '@shared/components/image-selector/image-selector.component';
import {ImageService} from '@shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [
    CommonModule,
    FormsModule,
    MarkdownComponent,
    ReactiveFormsModule,
    ImageSelectorComponent
  ],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  blogpost?: BlogPost;
  categories$: Observable<Category[]> = new Observable<Category[]>();
  selectedCategories: Category["id"][] = [];
  isImageSelectorOpen = false;

  routeSubscription?: Subscription;
  editPostSubscription?: Subscription;
  deletePostSubscription?: Subscription;
  imageSelectorSubscription?: Subscription;

  constructor(
    private blogpostService: BlogpostService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();

    this.routeSubscription = this.route.paramMap.subscribe(
      {
        next: (params) => {
          this.id = params.get('id');

          if (this.id) {
            this.blogpostService.getById(this.id)
              .subscribe(
                {
                  next: (blog) => {
                    this.blogpost = blog;
                    this.selectedCategories = blog.categories.map(category => category.id);
                  },
                  error: (error) => console.log(error)
                }
              )
          }

          this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe({
            next: (image) => {
              if (this.blogpost) {
                this.blogpost.featuredImageUrl = image.url;
                this.closeImageSelector();
              }
            }
          })
        }
      }
    )
  }

  onFormSubmit(): void {
    if (this.id && this.blogpost) {

      const updateBlogRequest: UpdateBlogRequestModel = {
        author: this.blogpost?.author,
        content: this.blogpost?.content,
        featuredImageUrl: this.blogpost?.featuredImageUrl,
        isPublished: this.blogpost?.isPublished,
        publishedOn: this.blogpost?.publishedOn,
        shortDescription: this.blogpost?.shortDescription,
        title: this.blogpost?.title,
        urlHandle: this.blogpost?.urlHandle,
        categories: this.selectedCategories
      }

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

  openImageSelector() {
    this.isImageSelectorOpen = true;
  }

  closeImageSelector() {
    this.isImageSelectorOpen = false;
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
    this.editPostSubscription?.unsubscribe();
    this.deletePostSubscription?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();
  }

}
