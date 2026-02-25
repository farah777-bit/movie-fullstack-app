using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.WatchlistDto
{
    public class WatchlistItemDto
    {
        public int MovieId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? PosterPath { get; set; }
        public string? ReleaseDate { get; set; }
        public double? VoteAverage { get; set; }
        public string? Overview { get; set; }

        public DateTime AddedAt { get; set; }
        public bool IsWatched { get; set; }
       
    }
}