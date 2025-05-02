import {Category} from '@category/models/category.model';

export interface UpdateBlogRequestModel {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedOn: Date;
  author: string;
  isPublished: boolean;
  categories: Category["id"][]
}
