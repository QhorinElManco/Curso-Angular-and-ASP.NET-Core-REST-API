using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTOs;
using CodePulse.API.Models.DTOs.Category;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController(ICategoryRepository categoryRepository) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
    {
        var category = new Category
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
        var category = await categoryRepository.GetByIdAsync(id);

        if (category == null) return NotFound();

        var categoryDto = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };

        return Ok(categoryDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await categoryRepository.GetAllAsync();

        var categoriesDto = categories.Select(category => new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                }
            )
            .ToList();

        return Ok(categoriesDto);
    }

    [HttpPut("{id:Guid}")]
    public async Task<IActionResult> UpdateCategory(
        [FromRoute] Guid id,
        [FromBody] UpdateCategoryRequestDto categoryDto
    )
    {
        var newCategory = new Category
        {
            Id = id,
            Name = categoryDto.Name,
            UrlHandle = categoryDto.UrlHandle
        };

        var categoryUpdated = await categoryRepository.UpdateAsync(newCategory);

        if (categoryUpdated == null) return NotFound();

        var categoryUpdatedDto = new CategoryDto
        {
            Id = categoryUpdated.Id,
            Name = categoryUpdated.Name,
            UrlHandle = categoryUpdated.UrlHandle
        };

        return Ok(categoryUpdatedDto);
    }

    [HttpDelete("{id:Guid}")]
    public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
    {
        var isCategoryDeleted = await categoryRepository.DeleteAsync(id);

        if (isCategoryDeleted == null) return NotFound();

        return NoContent();
    }
}