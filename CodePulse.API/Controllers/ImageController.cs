using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTOs.BlogImage;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageController(IImageRepository imageRepository) : ControllerBase
{
    // GET
    [HttpPost]
    public async Task<IActionResult> UploadImage(
        [FromForm] string filename,
        [FromForm] string title,
        IFormFile file
    )
    {
        ValidateFileToUpload(file);

        if (!ModelState.IsValid) return BadRequest(ModelState);

        var blogImage = new BlogImage
        {
            FileExtension = Path.GetExtension(file.FileName).ToLower(),
            FileName = filename,
            Title = title,
            CreatedOn = DateTime.Now
        };

        blogImage = await imageRepository.Upload(file, blogImage);

        var blogImageDto = new BlogImageDto
        {
            Id = blogImage.Id,
            FileName = blogImage.FileName,
            FileExtension = blogImage.FileExtension,
            Title = blogImage.Title,
            Url = blogImage.Url,
            CreatedOn = blogImage.CreatedOn
        };

        return Ok(blogImageDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetImages()
    {
        var images = await imageRepository.GetAll();

        var imagesDto = images.Select(i => new BlogImageDto
        {
            Id = i.Id,
            FileName = i.FileName,
            FileExtension = i.FileExtension,
            Title = i.Title,
            Url = i.Url,
            CreatedOn = i.CreatedOn
        });

        return Ok(imagesDto);
    }

    private void ValidateFileToUpload(IFormFile file)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };

        if (!allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
            ModelState.AddModelError("file", "Unsupported file type.");

        if (file.Length > 10485760)
            ModelState.AddModelError("file", "File size is too large. The maximum file size is 10MB.");
    }
}