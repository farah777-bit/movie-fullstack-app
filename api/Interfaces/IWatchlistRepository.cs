using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.WatchlistDto;
using api.Model;

namespace api.Interfaces
{
    public interface IWatchlistRepository
    {
        Task<List<WatchlistItemDto>> GetUserWatchlist(AppUser user);
        Task CreateAsync(Watchlist watchlist);
        Task<bool> DeleteAsync(string userId, int movieId);
        Task<bool> ExistsAsync(string userId, int movieId);

        Task<WatchlistItemDto> GetItemAsync(string userId, int movieId);

        Task<bool> UpdateIsWatchedAsync(string userId, int movieId, bool isWatched);
    }
}