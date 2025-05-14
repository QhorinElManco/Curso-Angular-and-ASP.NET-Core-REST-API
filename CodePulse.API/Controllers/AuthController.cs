using CodePulse.API.Models.DTOs.Auth;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(
    UserManager<IdentityUser> userManager,
    ITokenRepository tokenRepository
) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
    {
        var user = new IdentityUser
        {
            UserName = request.Email.Trim(),
            Email = request.Email.Trim()
        };

        // Intentar crear el usuario
        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return HandleIdentityErrors(result);
        }

        // Intentar asignar el rol
        result = await userManager.AddToRoleAsync(user, "Reader");

        if (!result.Succeeded)
        {
            return HandleIdentityErrors(result);
        }

        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);

        if (user == null)
        {
            ModelState.AddModelError("", "Invalid email or password.");
            return BadRequest(ModelState);
        }

        var isValidPassword = await userManager.CheckPasswordAsync(user, request.Password);

        if (!isValidPassword)
        {
            ModelState.AddModelError("", "Invalid email or password.");
            return BadRequest(ModelState);
        }

        var roles = await userManager.GetRolesAsync(user);
        var token = tokenRepository.CreateJwtToken(user, roles.ToList());

        var response = new LoginRequestDto
        {
            Email = request.Email,
            Roles = roles.ToList(),
            Token = token
        };


        return Ok(response);
    }


    private IActionResult HandleIdentityErrors(IdentityResult result)
    {
        if (!result.Errors.Any()) return ValidationProblem(ModelState);

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        return BadRequest(ModelState);
    }
}