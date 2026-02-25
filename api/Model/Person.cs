using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Person
    {
        public int Id { get; set; }            // TMDb person id
        public string Name { get; set; }
        public string ProfilePath { get; set; } // profile_path

        // علاقات
        public List<MovieCast> CastInMovies { get; set; }
        public List<MovieCrew> CrewInMovies { get; set; }
    }
}