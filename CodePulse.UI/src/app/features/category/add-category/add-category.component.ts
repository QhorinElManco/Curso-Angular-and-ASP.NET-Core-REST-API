import {Component, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AddCategoryRequest} from '@category/models/add-category-request.model';
import {CategoryService} from '@category/services/category.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [
    FormsModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }

  onFormSubmit() {
    this.addCategorySubscription = this.categoryService.create(this.model).subscribe({
      next: (response) => {
        console.log(response)
        this.router.navigateByUrl("/admin/categories");
      },
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}

