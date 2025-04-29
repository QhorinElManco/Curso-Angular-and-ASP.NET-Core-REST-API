using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation;

public class CategoryRepository(ApplicationDbContext dbContext) : ICategoryRepository
{
    public async Task<Category> CreateAsync(Category category)
    {
        await dbContext.Categories.AddAsync(category);
        await dbContext.SaveChangesAsync();
        return category;
    }

    public async Task<Category?> GetByIdAsync(Guid id)
    {
        return await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await dbContext.Categories.ToListAsync();
    }

    public async Task<Category?> UpdateAsync(Category newCategory)
    {
        var category = await GetByIdAsync(newCategory.Id);

        if (category == null) return null;

        dbContext.Entry(category).CurrentValues.SetValues(newCategory);
        await dbContext.SaveChangesAsync();
        return category;
    }
}