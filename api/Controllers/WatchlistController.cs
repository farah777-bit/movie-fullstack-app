using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.WatchlistDto;
using api.Interfaces;
using api.Mappers;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/watchlist")]
    [ApiController]
 
    public class WatchlistController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMovieRepository _MovieRepo;
        private readonly IWatchlistRepository _WatchlistRepo;
        public WatchlistController(UserManager<AppUser> userManager, IMovieRepository movieRepo, IWatchlistRepository watchlistRepo)
        {
            _userManager = userManager;
            _MovieRepo = movieRepo;
            _WatchlistRepo = watchlistRepo;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserWatchlist()
        {
            var appUser = await _userManager.GetUserAsync(User);
            if (appUser == null) return Unauthorized();

            var userWatchlist = await _WatchlistRepo.GetUserWatchlist(appUser);
            return Ok(userWatchlist);
        }

        [HttpPost("{movieId:int}")]
        [Authorize]
        public async Task<ActionResult<WatchlistItemDto>> Create(int movieId)
        {
            var appUser = await _userManager.GetUserAsync(User);
            if (appUser == null) return Unauthorized();


            var movie = await _MovieRepo.GetMovieByIdAsync(movieId);
            if (movie == null) return NotFound("Movie not found");


            var exists = await _WatchlistRepo.ExistsAsync(appUser.Id, movieId);
            if (exists)
                return BadRequest("This movie already exists in your watchlist");

            CreateWatchlistDto dto = new CreateWatchlistDto
            {
                MovieId = movieId,
            };

            var watchlist = dto.ToWatchlist(appUser.Id);

            await _WatchlistRepo.CreateAsync(watchlist);


            var item = await _WatchlistRepo.GetItemAsync(appUser.Id, dto.MovieId);
            return Ok(item);
        }

        [HttpDelete("{movieId:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int movieId)
        {
            var appUser = await _userManager.GetUserAsync(User);
            if (appUser == null) return Unauthorized();

            var deleted = await _WatchlistRepo.DeleteAsync(appUser.Id, movieId);

            if (!deleted)
                return NotFound("Movie not found in your watchlist");

            return NoContent(); // 204
        }

        [HttpPatch("{movieId:int}/watched")]
        [Authorize]
        public async Task<IActionResult> UpdateWatched( int movieId, UpdateWatchlistWatchedDto dto)
        {
            var appUser = await _userManager.GetUserAsync(User);
            if (appUser == null) return Unauthorized();

            var updated = await _WatchlistRepo.UpdateIsWatchedAsync( appUser.Id, movieId, dto.IsWatched);

            if (!updated)
                return NotFound("Movie not found in your watchlist");

            return NoContent(); // 204
        } 
    }
}