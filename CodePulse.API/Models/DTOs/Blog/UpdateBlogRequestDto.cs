namespace CodePulse.API.Models.DTOs.Blog;

public class UpdateBlogRequestDto
{
    public string Title { get; set; }
    public string ShortDescription { get; set; }
    public string Content { get; set; }
    public string FeaturedImageUrl { get; set; }
    public string UrlHandle { get; set; }
    public DateTime PublishedOn { get; set; }
    public string Author { get; set; }
    public bool IsPublished { get; set; }
    public Guid[] Categories { get; set; }
}