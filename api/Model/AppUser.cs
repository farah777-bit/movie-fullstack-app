using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Model
{
    public class AppUser : IdentityUser
    {
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Watchlist> Watchlists { get; set; } = new List<Watchlist>();
    }
}