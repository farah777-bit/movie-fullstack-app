using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.MovieDto
{
    public class MovieDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string OriginalTitle { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public string PosterPath { get; set; } = string.Empty;
        public string BackdropPath { get; set; } = string.Empty;
        public string ReleaseDate { get; set; } = string.Empty;
        public double VoteAverage { get; set; }
        public int VoteCount { get; set; }
        public bool Adult { get; set; }
        public string OriginalLanguage { get; set; } = string.Empty;

        public List<string> Genres { get; set; }
        public List<MovieCastDto> Cast { get; set; }
        public List<MovieCrewDto> Crew { get; set; }
    }
}