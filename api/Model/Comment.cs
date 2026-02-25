using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Comment
    {
        public int Id { get; set; }

    
        public int MovieId { get; set; }
        public Movie Movie { get; set; }


        public string UserId { get; set; }
        public AppUser User { get; set; }


        public string Text { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}