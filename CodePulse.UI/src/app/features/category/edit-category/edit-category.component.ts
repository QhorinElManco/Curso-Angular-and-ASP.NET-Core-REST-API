import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Category} from '../models/category.model';
import {UpdateCategoryRequestModel} from '../models/update-category-request.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  category?: Category;
  paramsSubscrition?: Subscription;
  editCategorySubscription?: Subscription;

  constructor(
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

  onFormSubmit(): void {
    const updateCategoryRequest: UpdateCategoryRequestModel = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };

    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest).subscribe({
        next: () => this.router.navigateByUrl("/admin/categories"),
        error: (error) => console.log(error)
      });
    }
  }


  ngOnDestroy() {
    this.paramsSubscrition?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
