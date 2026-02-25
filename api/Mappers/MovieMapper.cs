using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.MovieDto;
using api.Model;

namespace api.Mappers
{
    public static class MovieMapper
    {
        public static MovieListDto ToMovieListDto(this Movie movieModel)
        {
            return new MovieListDto
            {
                Id = movieModel.Id,
                Title = movieModel.Title,
                PosterPath = movieModel.PosterPath,
                ReleaseDate = movieModel.ReleaseDate,
                VoteAverage = movieModel.VoteAverage,
                Overview = movieModel.Overview,
                BackdropPath = movieModel.BackdropPath,
                Comments = movieModel.Comments.Select(c => c.ToCommentDto()).ToList(),
                MovieGenres = movieModel.MovieGenres.Select(mg => mg.Genre.Name).ToList()
            };
        }

        public static Movie ToMovieFromTMDB(this TMDBMovie movieModel)
        {
            return new Movie
            {

                Title = movieModel.title,
                PosterPath = movieModel.poster_path,
                ReleaseDate = movieModel.release_date,
                VoteAverage = movieModel.vote_average
            };
        }
        public static Movie ToStockFromCreateDto(this CreateMovieRequestDto movieModel)
        {
            return new Movie
            {

                Title = movieModel.title,
                PosterPath = movieModel.poster_path,
                ReleaseDate = movieModel.release_date,
                VoteAverage = movieModel.vote_average

            };
        }


    }
}