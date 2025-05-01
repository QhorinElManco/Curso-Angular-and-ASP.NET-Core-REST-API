using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interfaces;

public interface IBlogPostRepository
{
    public Task<BlogPost> CreateAsync(BlogPost blogPost);
    public Task<BlogPost?> GetByIdAsync(Guid id);
    public Task<IEnumerable<BlogPost>> GetAllAsync();
    public Task<BlogPost?> UpdateAsync(BlogPost blogPost);
    public Task<BlogPost?> DeleteAsync(Guid id);
}