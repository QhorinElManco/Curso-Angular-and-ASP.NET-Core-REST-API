import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Category} from '../models/category.model';

@Component({
  selector: 'app-edit-category',
  imports: [],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  category?: Category;
  paramsSubscrition?: Subscription;

  constructor(private categoryService: CategoryService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramsSubscrition = this.router.paramMap.subscribe(
      {
        next: (params) => {
          this.id = params.get('id');

          if (this.id) {
            this.categoryService.getCategoryById(this.id)
              .subscribe(
                {
                  next: (category) => {
                    this.category = category;
                  },
                  error: (error) => console.log(error)
                }
              )
          }
        }
      }
    )

  }

  ngOnDestroy() {
    this.paramsSubscrition?.unsubscribe();
  }
}
