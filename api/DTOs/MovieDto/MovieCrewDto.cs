using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.MovieDto
{
    public class MovieCrewDto
    {
        public int PersonId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Job { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string ProfilePath { get; set; } = string.Empty;
    }
}