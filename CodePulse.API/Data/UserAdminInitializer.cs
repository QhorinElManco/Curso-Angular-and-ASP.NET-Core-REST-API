using Microsoft.AspNetCore.Identity;

namespace CodePulse.API.Models.DTOs.Auth;

public static class UserInitializer
{
    public static async Task InitializeAdminUser(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        const string adminEmail = "admin@codepulse.com";
        const string adminId = "0196ca98-d921-7364-b37e-84462b0aef10";

        // Verifica si el usuario ya existe
        var adminUser = await userManager.FindByEmailAsync(adminEmail);

        if (adminUser == null)
        {
            // Crea el usuario
            adminUser = new IdentityUser
            {
                Id = adminId,
                UserName = adminEmail,
                Email = adminEmail,
                NormalizedEmail = adminEmail.ToUpper(),
                NormalizedUserName = adminEmail.ToUpper(),
            };

            await userManager.CreateAsync(adminUser, "<PASSWORD>");

            // Asigna roles
            await userManager.AddToRoleAsync(adminUser, "Reader");
            await userManager.AddToRoleAsync(adminUser, "Writer");
        }
    }
}