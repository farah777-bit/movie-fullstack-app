using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.WatchlistDto;
using api.Model;

namespace api.Mappers
{
    public static class WatchlistMapper
    {
        public static Watchlist ToWatchlist(this CreateWatchlistDto dto, string userId)
        {
            return new Watchlist
            {
                UserId = userId,
                MovieId = dto.MovieId,
                AddedAt = DateTime.UtcNow,
                IsWatched = false
            };
        }
    }
}