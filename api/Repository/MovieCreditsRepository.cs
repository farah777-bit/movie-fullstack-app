using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.CreditsDto;
using api.Interfaces;
using api.Mappers;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class MovieCreditsRepository : IMovieCreditsRepository
    {
        private readonly ApplicationDBContext _context;

        public MovieCreditsRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<MovieCreditsDto> GetMovieCreditsAsync(int movieId)
        {
            // Cast
            var casts = await _context.MovieCasts
                .AsNoTracking()
                .Where(mc => mc.MovieId == movieId)
                .Include(mc => mc.Person)
                .ToListAsync();

            // Crew
            var crews = await _context.MovieCrews
                .AsNoTracking()
                .Where(mc => mc.MovieId == movieId)
                .Include(mc => mc.Person)
                .ToListAsync();

            // Mapping to DTO (باستخدام المابر اللي عملناه)
            return casts.ToMovieCreditsDto(crews);
        }

    }
}