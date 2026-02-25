using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.MovieDto;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IMovieRepository _movieRepo;
        private readonly IMovieCreditsRepository _creditsRepo;
        private readonly ITMDBService _tmdbService;

        public MovieController(ApplicationDBContext context, IMovieRepository movieRepo, ITMDBService tMDBService, IMovieCreditsRepository creditsRepo)
        {
            _movieRepo = movieRepo;
            _context = context;
            _tmdbService = tMDBService;
            _creditsRepo = creditsRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            var movies = await _movieRepo.GetAllMoviesAsync(query);
            if (!string.IsNullOrWhiteSpace(query.MovieTitle) && (movies == null || !movies.Any()))
            {
                var movie = await _tmdbService.FindMovieByTitleAsync(query.MovieTitle);
                if (movie == null)
                {
                    return BadRequest("Movie does not exist ");
                }
                else
                {
                    await _movieRepo.CreateAsync(movie);
                    movies = await _movieRepo.GetAllMoviesAsync(query);
                }
            }
                var moviesDto = movies.Select(s => s.ToMovieListDto()).ToList();
                return Ok(moviesDto); 
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetMovieById([FromRoute] int id)
        {
            var movie = await _movieRepo.GetMovieByIdAsync(id); 
            if (movie == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(movie.ToMovieListDto());
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMovieRequestDto movieDto)
        {
            var movieModel = movieDto.ToStockFromCreateDto();
            await _movieRepo.CreateAsync(movieModel);
            return CreatedAtAction(nameof(GetMovieById), new { id = movieModel.Id }, movieModel.ToMovieListDto());
        }

        [HttpGet("{movieId:int}/credits")]
        public async Task<IActionResult> GetCredits([FromRoute] int movieId)
        {
            var credits = await _creditsRepo.GetMovieCreditsAsync(movieId);
            return Ok(credits);
        }

    }
}