using api.fe_interview_master_v3.Model;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.fe_interview_master_v3.Controllers
{
    [Route("games")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public GameController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync(string? searchTerm, string? providers)
        {
            string filePath = Path.Combine(_env.ContentRootPath, "Data", "game.mock-data.json");
            if (!System.IO.File.Exists(filePath))
                return NotFound("Games data not found.");

            IEnumerable<Game> games = await GetGamesAsync<List<Game>>(filePath);

            if (games == null)
                return NotFound("Unable to deserialize JSON data.");
            
            if (!string.IsNullOrEmpty(searchTerm))
                games = games.Where(x => x.title.ToLower().Contains(searchTerm.ToLower())).ToList();
            if (!string.IsNullOrEmpty(providers))
            {
                string[] provider = providers.ToLower().Split(',');
                if (provider.Length > 0)
                    games = games.Where(x => provider.Contains(x.providerName.ToLower())).ToList();
            }

            return Ok(games);
        }

        private static async Task<T> GetGamesAsync<T>(string path)
        {
            using StreamReader reader = new(path);
            string jsonContent = await reader.ReadToEndAsync();
            return JsonSerializer.Deserialize<T>(jsonContent)!;
        }
    }
}
