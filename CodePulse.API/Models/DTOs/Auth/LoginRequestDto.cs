namespace CodePulse.API.Models.DTOs.Auth;

public class LoginRequestDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public List<string> Roles { get; set; } = [];

    public string Token { get; set; } = string.Empty;
}