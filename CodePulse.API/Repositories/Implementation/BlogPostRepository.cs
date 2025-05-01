using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation;

public class BlogPostRepository(ApplicationDbContext dbContext) : IBlogPostRepository
{
    public async Task<BlogPost> CreateAsync(BlogPost blogPost)
    {
        await dbContext.BlogPosts.AddAsync(blogPost);
        await dbContext.SaveChangesAsync();
        return blogPost;
    }

    public async Task<BlogPost?> GetByIdAsync(Guid id)
    {
        return await dbContext.BlogPosts.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<BlogPost>> GetAllAsync()
    {
        return await dbContext.BlogPosts.ToListAsync();
    }

    public async Task<BlogPost?> UpdateAsync(BlogPost blogPost)
    {
        var blogPostToUpdate = await GetByIdAsync(blogPost.Id);

        if (blogPostToUpdate == null) return null;

        dbContext.Entry(blogPostToUpdate).CurrentValues.SetValues(blogPost);
        await dbContext.SaveChangesAsync();
        return blogPostToUpdate;
    }

    public async Task<BlogPost?> DeleteAsync(Guid id)
    {
        var blogPost = await GetByIdAsync(id);

        if (blogPost == null) return null;

        dbContext.BlogPosts.Remove(blogPost);
        await dbContext.SaveChangesAsync();
        return blogPost;
    }
}