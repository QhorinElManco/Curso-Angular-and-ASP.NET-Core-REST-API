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
        Category? category = await dbContext.Categories.FindAsync(id);
        return category;
    }

    public async Task<Category?> UpdateAsync(Category newCategory)
    {
        Category? category = await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == newCategory.Id);

        if (category != null)
        {
            dbContext.Entry(category).CurrentValues.SetValues(newCategory);
            await dbContext.SaveChangesAsync();
            return category;
        }

        return null;
    }
}