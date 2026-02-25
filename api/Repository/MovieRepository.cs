using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDBContext _context;
        public MovieRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Movie>> GetAllMoviesAsync(QueryObject query)
        {
            var movies = _context.Movies.Include(c => c.Comments).ThenInclude(a => a.User)
            .Include(mg=>mg.MovieGenres).ThenInclude(m=>m.Genre).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.MovieTitle))
            {
                movies = movies.Where(m => m.Title.Contains(query.MovieTitle));
            }
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Title", StringComparison.OrdinalIgnoreCase))
                {
                    movies = query.IsDescending ? movies.OrderByDescending(s => s.Title) : movies.OrderBy(s => s.Title);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await movies.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }
        public async Task<Movie> CreateAsync(Movie movieModel)
        {
            await _context.Movies.AddAsync(movieModel);
            await _context.SaveChangesAsync();
            return movieModel;

        }

        public async Task<Movie?> GetMovieByIdAsync(int id)
        {
            return await _context.Movies.Include(mg => mg.MovieGenres).ThenInclude(m => m.Genre)
            .Include(c => c.Comments).ThenInclude(u=> u.User)
            .FirstOrDefaultAsync(i => i.Id == id);

        }

        public async Task<Movie?> GetMovieByTitleAsync(string title)
        {
            return await _context.Movies.FirstOrDefaultAsync(s => s.Title == title);
        }

        public Task<bool> MovieExists(int id)
        {
            return _context.Movies.AnyAsync(s => s.Id == id);
        }
    }
}