export interface BlogPost {
  Id: string;
  Title: string;
  ShortDescription: string;
  Content: string;
  FeaturedImageUrl: string;
  UrlHandle: string;
  PublishedOn: Date;
  Author: string;
  IsPublished: boolean;
}
