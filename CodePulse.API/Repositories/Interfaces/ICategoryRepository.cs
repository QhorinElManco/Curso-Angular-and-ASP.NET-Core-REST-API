using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interfaces;

public interface ICategoryRepository
{
    Task<Category> CreateAsync(Category category);
    Task<Category?> GetByIdAsync(Guid id);
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category?> UpdateAsync(Category category);
    Task<Category?> DeleteAsync(Guid id);
}