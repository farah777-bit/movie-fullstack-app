using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Watchlist
    {
        public int Id { get; set; }


        public string UserId { get; set; } = string.Empty;
        public AppUser User { get; set; } = null!;

        public int MovieId { get; set; }
        public Movie Movie { get; set; } = null!;


        public DateTime AddedAt { get; set; } = DateTime.UtcNow;

        public bool IsWatched { get; set; } = false;
    }
}