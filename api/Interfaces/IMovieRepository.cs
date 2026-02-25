using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Model;

namespace api.Interfaces
{
    public interface IMovieRepository
    {
        Task<List<Movie>> GetAllMoviesAsync(QueryObject query);
        Task<Movie?> GetMovieByIdAsync(int id);
        Task<Movie?> GetMovieByTitleAsync(string title);
        Task<Movie> CreateAsync(Movie movieModel);
        Task<bool> MovieExists(int id);
    }
}