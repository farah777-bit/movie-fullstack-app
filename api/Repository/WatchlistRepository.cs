using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.WatchlistDto;
using api.Interfaces;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class WatchlistRepository : IWatchlistRepository
    {
        private readonly ApplicationDBContext _context;
        public WatchlistRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Watchlist watchlist)
        {
            await _context.Watchlists.AddAsync(watchlist);
            await _context.SaveChangesAsync();
        }



        public async Task<bool> DeleteAsync(string userId, int movieId)
        {
            var watchlist = await _context.Watchlists
                .FirstOrDefaultAsync(w =>
                    w.UserId == userId &&
                    w.MovieId == movieId);

            if (watchlist == null)
                return false;

            _context.Watchlists.Remove(watchlist);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ExistsAsync(string userId, int movieId)
        {
            return await _context.Watchlists
                .AnyAsync(w => w.UserId == userId && w.MovieId == movieId);
        }

        public async Task<WatchlistItemDto> GetItemAsync(string userId, int movieId)
        {
            return await _context.Watchlists
                .Where(w => w.UserId == userId && w.MovieId == movieId)
                .Select(w => new WatchlistItemDto
                {
                    MovieId = w.MovieId,
                    Title = w.Movie.Title,
                    PosterPath = w.Movie.PosterPath,
                    ReleaseDate = w.Movie.ReleaseDate,
                    VoteAverage = w.Movie.VoteAverage,
                    Overview = w.Movie.Overview,
                    AddedAt = w.AddedAt,
                    IsWatched = w.IsWatched
                })
                .FirstAsync();
        }

        public async Task<List<WatchlistItemDto>> GetUserWatchlist(AppUser user)
        {
            return await _context.Watchlists.Where(u => u.UserId == user.Id)
                .OrderByDescending(w => w.AddedAt)
                .Select(w => new WatchlistItemDto
                {
                    MovieId = w.MovieId,
                    Title = w.Movie.Title,
                    PosterPath = w.Movie.PosterPath,
                    ReleaseDate = w.Movie.ReleaseDate,
                    VoteAverage = w.Movie.VoteAverage,
                    Overview = w.Movie.Overview,

                    AddedAt = w.AddedAt,
                    IsWatched = w.IsWatched
                })
                .ToListAsync();
        }

        public async Task<bool> UpdateIsWatchedAsync(string userId, int movieId, bool isWatched) 
        {
            var watchlist = await _context.Watchlists
                .FirstOrDefaultAsync(w =>
                    w.UserId == userId &&
                    w.MovieId == movieId);

            if (watchlist == null)
                return false;

            watchlist.IsWatched = isWatched;
            await _context.SaveChangesAsync();

            return true;
        }
    }
    
}