using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Data;

public class AuthDbContext(DbContextOptions<AuthDbContext> options) : IdentityDbContext(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Solo configura los roles en el modelo
        const string readerRoleId = "0196ca99-d921-7364-b37e-84462b0aef11";
        const string writerRoleId = "0196ca9a-d453-707b-be69-e9713fed4600";

        var roles = new List<IdentityRole>
        {
            new()
            {
                Id = writerRoleId,
                Name = "Writer",
                NormalizedName = "Writer".ToUpper(),
                ConcurrencyStamp = writerRoleId
            },
            new()
            {
                Id = readerRoleId,
                Name = "Reader",
                NormalizedName = "Reader".ToUpper(),
                ConcurrencyStamp = readerRoleId
            }
        };

        // Seed solo los roles
        builder.Entity<IdentityRole>().HasData(roles);
    }
}