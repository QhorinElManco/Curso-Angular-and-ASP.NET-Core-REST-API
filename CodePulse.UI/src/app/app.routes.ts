import {Routes} from '@angular/router';
import {CategoryListComponent} from '@category/category-list/category-list.component';
import {AddCategoryComponent} from '@category/add-category/add-category.component';
import {BlogpostListComponent} from '@blogpost/blogpost-list/blogpost-list.component';
import {AddBlogpostComponent} from '@blogpost/add-blogpost/add-blogpost.component';
import {EditCategoryComponent} from '@category/edit-category/edit-category.component';
import {EditBlogpostComponent} from '@blogpost/edit-blogpost/edit-blogpost.component';
import {HomeComponent} from '@features/public/home/home.component';
import {BlogDetailsComponent} from '@features/public/blog-detail/blog-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "admin/categories",
    component: CategoryListComponent
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent
  },
  {
    path: 'admin/blogposts',
    component: BlogpostListComponent
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent
  },
  {
    path: 'admin/blogposts/:id',
    component: EditBlogpostComponent
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  }
];
