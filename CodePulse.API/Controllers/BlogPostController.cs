using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTOs.Blog;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostController(IBlogPostRepository repository) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogRequestDto request)
    {
        var blogPost = new BlogPost
        {
            Title = request.Title,
            ShortDescription = request.ShortDescription,
            Content = request.Content,
            FeaturedImageUrl = request.FeaturedImageUrl,
            UrlHandle = request.UrlHandle,
            PublishedOn = request.PublishedOn,
            Author = request.Author,
            IsPublished = request.IsPublished
        };

        blogPost = await repository.CreateAsync(blogPost);

        var blogPostDto = new BlogDto
        {
            Id = blogPost.Id,
            Title = blogPost.Title,
            ShortDescription = blogPost.ShortDescription,
            Content = blogPost.Content,
            FeaturedImageUrl = blogPost.FeaturedImageUrl,
            UrlHandle = blogPost.UrlHandle,
            PublishedOn = blogPost.PublishedOn,
            Author = blogPost.Author,
            IsPublished = blogPost.IsPublished
        };

        return Created($"/api/blogpost/{blogPostDto.Id}", blogPostDto);
    }

    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> GetBlogPost(Guid id)
    {
        var blogPost = await repository.GetByIdAsync(id);

        if (blogPost == null)
        {
            return NotFound();
        }

        var blogDto = new BlogDto
        {
            Id = blogPost.Id,
            Title = blogPost.Title,
            ShortDescription = blogPost.ShortDescription,
            Content = blogPost.Content,
            FeaturedImageUrl = blogPost.FeaturedImageUrl,
            UrlHandle = blogPost.UrlHandle,
            PublishedOn = blogPost.PublishedOn,
            Author = blogPost.Author,
            IsPublished = blogPost.IsPublished
        };

        return Ok(blogDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetBlogPosts()
    {
        var blogPosts = await repository.GetAllAsync();

        var blogsDto = new List<BlogDto>();

        foreach (var blogPost in blogPosts)
        {
            var dto = new BlogDto
            {
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                UrlHandle = blogPost.UrlHandle,
                PublishedOn = blogPost.PublishedOn,
                Author = blogPost.Author,
                IsPublished = blogPost.IsPublished
            };

            blogsDto.Add(dto);
        }

        return Ok(blogsDto);
    }
}