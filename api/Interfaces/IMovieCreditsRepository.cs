using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.CreditsDto;

namespace api.Interfaces
{
    public interface IMovieCreditsRepository
    {
        Task<MovieCreditsDto> GetMovieCreditsAsync(int movieId);
    }
}