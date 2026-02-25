using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.MovieDto
{
    public class MovieCastDto
    {
        public int PersonId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Character { get; set; } = string.Empty;
        public int Order { get; set; }
        public string ProfilePath { get; set; } = string.Empty;
    }
}