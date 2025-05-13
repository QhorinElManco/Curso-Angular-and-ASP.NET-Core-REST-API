import {Component, OnInit} from '@angular/core';
import {BlogpostService} from '@blogpost/services/blogpost.service';
import {BlogPost} from '@blogpost/models/blogpost.model';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  blogposts$?: Observable<BlogPost[]>;

  constructor(private blogService: BlogpostService) {
  }

  ngOnInit(): void {
    this.blogposts$ = this.blogService.getAll();
  }
}
