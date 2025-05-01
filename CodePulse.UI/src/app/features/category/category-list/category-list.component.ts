import {Component, OnInit} from '@angular/core';
import {CategoryService} from '@category/services/category.service';
import {Category} from '@category/models/category.model';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]> = new Observable<Category[]>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll()
  }

}
