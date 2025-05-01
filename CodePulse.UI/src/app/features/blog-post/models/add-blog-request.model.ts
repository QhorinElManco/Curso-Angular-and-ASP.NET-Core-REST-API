export interface AddBlogRequestModel {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedOn: Date;
  author: string;
  isPublished: boolean;
}
