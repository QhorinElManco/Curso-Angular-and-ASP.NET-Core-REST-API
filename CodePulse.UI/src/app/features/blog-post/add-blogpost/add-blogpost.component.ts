import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AddBlogRequestModel} from '../models/add-blog-request.model';
import {CommonModule, DatePipe} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {BlogpostService} from '@blogpost/services/blogpost.service';
import {Router} from '@angular/router';
import {MarkdownComponent} from 'ngx-markdown';
import {CategoryService} from '@category/services/category.service';
import {Category} from '@category/models/category.model';
import {ImageSelectorComponent} from '@shared/components/image-selector/image-selector.component';
import {ImageService} from '@shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  imports: [
    FormsModule,
    DatePipe,
    MarkdownComponent,
    CommonModule,
    ImageSelectorComponent
  ],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy, OnInit {
  model: AddBlogRequestModel;
  categories$: Observable<Category[]> = new Observable<Category[]>();
  isImageSelectorOpen: boolean = false;

  private addBlogpostSubscription?: Subscription;
  private imageSelectorSubscription?: Subscription;

  constructor(
    private blogService: BlogpostService,
    private categoryService: CategoryService,
    private imageService: ImageService,
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
    this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe({
      next: (image) => {
        this.model.featuredImageUrl = image.url;
        this.closeImageSelector();
      }
    })
  }


  onFormSubmit() {
    this.addBlogpostSubscription = this.blogService.create(this.model).subscribe({
      next: () => this.router.navigateByUrl("/admin/blogposts"),
      error: (error) => console.log(error)
    })
  }


  closeImageSelector() {
    this.isImageSelectorOpen = false;
  }

  openImageSelector() {
    this.isImageSelectorOpen = true;
  }

  ngOnDestroy(): void {
    this.addBlogpostSubscription?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();
  }
}
