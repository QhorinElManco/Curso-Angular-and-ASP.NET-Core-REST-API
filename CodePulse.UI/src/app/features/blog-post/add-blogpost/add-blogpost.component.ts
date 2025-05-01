import {Component, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AddBlogRequestModel} from '../models/add-blog-request.model';
import {DatePipe} from '@angular/common';
import {Subscription} from 'rxjs';
import {BlogpostService} from '../services/blogpost.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy {
  model: AddBlogRequestModel;
  private addBlogpostSubscription?: Subscription;

  constructor(
    private blogService: BlogpostService,
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
      title: ''
    }
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
