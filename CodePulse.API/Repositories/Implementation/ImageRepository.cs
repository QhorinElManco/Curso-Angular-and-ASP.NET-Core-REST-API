using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation;

public class ImageRepository(
    IWebHostEnvironment webHostEnvironment,
    IHttpContextAccessor httpContextAccessor,
    ApplicationDbContext dbContext
) : IImageRepository
{
    public async Task<BlogImage> Upload(IFormFile file, BlogImage blogImage)
    {
        var localPath = Path.Combine(
            webHostEnvironment.ContentRootPath,
            "Images",
            $"{blogImage.FileName}{blogImage.FileExtension}"
        );

        await using var stream = new FileStream(localPath, FileMode.Create);
        await file.CopyToAsync(stream);

        var httpRequest = httpContextAccessor.HttpContext!.Request;

        var urlPath =
            $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/Images/{blogImage.FileName}{blogImage.FileExtension}";

        blogImage.Url = urlPath;

        await dbContext.BlogImages.AddAsync(blogImage);
        await dbContext.SaveChangesAsync();
        return blogImage;
    }

    public async Task<IEnumerable<BlogImage>> GetAll()
    {
        return await dbContext.BlogImages.ToListAsync();
    }
}