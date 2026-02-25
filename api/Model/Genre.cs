using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Genre
    {
        public int Id { get; set; }           // TMDb genre id (مثلاً 28 لـ Action)
        public string Name { get; set; } = string.Empty;     // name
        public List<MovieGenre> MovieGenres { get; set; }
    }
}