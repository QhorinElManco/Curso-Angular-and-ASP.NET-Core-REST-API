import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BlogpostService} from '../services/blogpost.service';
import {Observable} from 'rxjs';
import {BlogPost} from '../models/blogpost.model';
import {AsyncPipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  imports: [
    RouterLink,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {

  blogposts$: Observable<BlogPost[]> = new Observable<BlogPost[]>();

  constructor(private blogService: BlogpostService) {
  }

  ngOnInit(): void {
    this.blogposts$ = this.blogService.getAll();
  }
}
