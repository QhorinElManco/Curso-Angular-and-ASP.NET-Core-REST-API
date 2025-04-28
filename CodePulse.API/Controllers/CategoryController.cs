using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTOs;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController(ApplicationDbContext dbContext, ICategoryRepository categoryRepository) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
    {
        Category category = new Category
        {
            Name = request.Name,
            UrlHandle = request.UrlHandle
        };

        await categoryRepository.CreateAsync(category);
        return Created($"/api/categories/{category.Id}", category);
    }

    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> GetCategory(Guid id)
    {
        Category? category = await categoryRepository.GetByIdAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        CategoryDto categoryDto = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };

        return Ok(categoryDto);
    }

    [HttpPut("{id:Guid}")]
    public async Task<IActionResult> UpdateCategory(
        [FromRoute] Guid id,
        [FromBody] UpdateCategoryRequestDto categoryDto
    )
    {
        Category newCategory = new Category
        {
            Id = id,
            Name = categoryDto.Name,
            UrlHandle = categoryDto.UrlHandle
        };

        Category? categoryUpdated = await categoryRepository.UpdateAsync(newCategory);

        if (categoryUpdated == null)
        {
            return NotFound();
        }

        CategoryDto categoryUpdatedDto = new CategoryDto
        {
            Name = categoryUpdated.Name,
            UrlHandle = categoryUpdated.UrlHandle
        };

        return Ok(categoryUpdatedDto);
    }
}