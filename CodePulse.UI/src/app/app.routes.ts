import {Routes} from '@angular/router';
import {CategoryListComponent} from '@category/category-list/category-list.component';
import {AddCategoryComponent} from '@category/add-category/add-category.component';
import {BlogpostListComponent} from '@blogpost/blogpost-list/blogpost-list.component';
import {AddBlogpostComponent} from '@blogpost/add-blogpost/add-blogpost.component';
import {EditCategoryComponent} from '@category/edit-category/edit-category.component';
import {EditBlogpostComponent} from '@blogpost/edit-blogpost/edit-blogpost.component';
import {HomeComponent} from '@features/public/home/home.component';
import {BlogDetailsComponent} from '@features/public/blog-detail/blog-details.component';
import {LoginComponent} from '@features/auth/login/login.component';
import {authGuard} from '@features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "admin/categories",
    component: CategoryListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/blogposts',
    component: BlogpostListComponent
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/blogposts/:id',
    component: EditBlogpostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  }
];
