import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {BlogpostService} from '@blogpost/services/blogpost.service';
import {BlogPost} from '@blogpost/models/blogpost.model';
import {CommonModule} from '@angular/common';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  imports: [
    CommonModule,
    MarkdownComponent
  ],
  templateUrl: './blog-details.component.html',
  styles: ``
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  url: string | null = null;
  blogpost$?: Observable<BlogPost>;

  private routeSubscription?: Subscription;

  constructor(
    private blogService: BlogpostService,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('url');

        if (this.url) {
          this.blogpost$ = this.blogService.getByUrl(this.url)
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

}
