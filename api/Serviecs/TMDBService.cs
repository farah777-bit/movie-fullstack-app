using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.MovieDto;
using api.Interfaces;
using api.Mappers;
using api.Model;
using Newtonsoft.Json;

namespace api.Serviecs
{
    public class TMDBService : ITMDBService
    {
        private HttpClient _httpClient;
        private IConfiguration _config;

        public TMDBService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }
        // public async Task<Movie> FindMovieByTitleAsync(string title)
        // {
        //     try
        //     {
        //         var result = await _httpClient.GetAsync($"https://api.themoviedb.org/3/search/movie?api_key=5e148b0de63ceccb8fd18ae62c61dd23&query=fight");
        //         if (result.IsSuccessStatusCode)
        //         {
        //             Console.WriteLine("***********************");
        //             Console.WriteLine(result);
        //             Console.WriteLine("+++++++++++++++++++++++++");
        //         }
        //         {
        //             Console.WriteLine("ooooooooooooooooooooooooooooooo");
        //             var content = await result.Content.ReadAsStringAsync();
        //             var tasks = JsonConvert.DeserializeObject<TMDBMovie[]>(content);
        //             var movie = tasks[0];
        //             Console.WriteLine(movie);
        //             if (movie != null)
        //             {
        //                 return movie.ToMovieFromTMDB();
        //             }
        //             return null;
        //         }
        //         return null;

        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine("error");
        //         return null;
        //     }
        // }

        public async Task<Movie?> FindMovieByTitleAsync(string title)
        {
            var q = Uri.EscapeDataString(title);
            var url = $"https://api.themoviedb.org/3/search/movie?query={q}&include_adult=false&language=en-US&page=1&api_key={_config["TMDBKey"]}";

            var result = await _httpClient.GetAsync(url);
            var content = await result.Content.ReadAsStringAsync();

            Console.WriteLine($"TMDB Status: {(int)result.StatusCode} {result.ReasonPhrase}");
            Console.WriteLine(content);

            if (!result.IsSuccessStatusCode) return null;

            var data = JsonConvert.DeserializeObject<TmbSearchResponse<TMDBMovie>>(content);
            var tmdbMovie = data?.Results?.FirstOrDefault();
            if (tmdbMovie == null) return null;

            return tmdbMovie.ToMovieFromTMDB();
        }
    }
}