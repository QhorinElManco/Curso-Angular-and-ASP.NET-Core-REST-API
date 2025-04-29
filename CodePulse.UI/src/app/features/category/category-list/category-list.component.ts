import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category.model';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]> = new Observable<Category[]>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories()
  }

}
