using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTOs.Blog;
using CodePulse.API.Models.DTOs.Category;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostController(
    IBlogPostRepository blogRepository,
    ICategoryRepository categoryRepository
) : ControllerBase
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
            IsPublished = request.IsPublished,
            Categories = new List<Category>()
        };

        foreach (var categoryId in request.Categories)
        {
            var category = await categoryRepository.GetByIdAsync(categoryId);

            if (category == null) return BadRequest($"Category with id {categoryId} not found.");

            blogPost.Categories.Add(category);
        }

        blogPost = await blogRepository.CreateAsync(blogPost);

        var categoriesDto = blogPost.Categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            UrlHandle = c.UrlHandle
        }).ToList();

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
            IsPublished = blogPost.IsPublished,
            Categories = categoriesDto
        };

        return Created($"/api/blogpost/{blogPostDto.Id}", blogPostDto);
    }

    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> GetBlogPost(Guid id)
    {
        var blogPost = await blogRepository.GetByIdAsync(id);

        if (blogPost == null) return NotFound();

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
            IsPublished = blogPost.IsPublished,
            Categories = blogPost.Categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                UrlHandle = c.UrlHandle
            }).ToList()
        };

        return Ok(blogDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetBlogPosts()
    {
        var blogPosts = await blogRepository.GetAllAsync();

        var blogsDto = blogPosts.Select(blogPost => new BlogDto
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                UrlHandle = blogPost.UrlHandle,
                PublishedOn = blogPost.PublishedOn,
                Author = blogPost.Author,
                IsPublished = blogPost.IsPublished,
                Categories = blogPost.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    UrlHandle = c.UrlHandle
                }).ToList()
            })
            .ToList();

        return Ok(blogsDto);
    }

    [HttpPatch("{id:Guid}")]
    public async Task<IActionResult> UpdateBlogPost(
        [FromRoute] Guid id,
        [FromBody] UpdateBlogRequestDto request
    )
    {
        var blogPost = new BlogPost
        {
            Id = id,
            Title = request.Title,
            ShortDescription = request.ShortDescription,
            Content = request.Content,
            FeaturedImageUrl = request.FeaturedImageUrl,
            UrlHandle = request.UrlHandle,
            PublishedOn = request.PublishedOn,
            Author = request.Author,
            IsPublished = request.IsPublished,
            Categories = new List<Category>()
        };

        foreach (var categoryId in request.Categories)
        {
            var category = await categoryRepository.GetByIdAsync(categoryId);

            if (category == null) return BadRequest($"Category with id {categoryId} not found.");

            blogPost.Categories.Add(category);
        }

        blogPost = await blogRepository.UpdateAsync(blogPost);

        if (blogPost == null) return NotFound();

        var categoriesDto = blogPost.Categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            UrlHandle = c.UrlHandle
        }).ToList();

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
            IsPublished = blogPost.IsPublished,
            Categories = categoriesDto
        };

        return Ok(blogPostDto);
    }

    [HttpDelete("{id:Guid}")]
    public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
    {
        var blog = await blogRepository.DeleteAsync(id);

        if (blog == null) return NotFound();

        return NoContent();
    }

    [HttpGet("{url}")]
    public async Task<IActionResult> GetBlogPost(string url)
    {
        var blogPost = await blogRepository.GetByUrlAsync(url);

        if (blogPost == null) return NotFound();

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
            IsPublished = blogPost.IsPublished,
            Categories = blogPost.Categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                UrlHandle = c.UrlHandle
            }).ToList()
        };

        return Ok(blogDto);
    }
}