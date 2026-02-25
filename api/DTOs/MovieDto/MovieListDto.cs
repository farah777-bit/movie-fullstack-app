using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.CommentDto;
using api.Model;

namespace api.DTOs.MovieDto
{
    public class MovieListDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string PosterPath { get; set; } = string.Empty;
        public string ReleaseDate { get; set; } = string.Empty;
        public double VoteAverage { get; set; }

        public List<string> MovieGenres { get; set; } = new List<string>();
        public string BackdropPath { get; set; } = string.Empty;

        public string Overview { get; set; } = string.Empty;
        public List<CommentDetailsDto> Comments { get; set; }
    }
}