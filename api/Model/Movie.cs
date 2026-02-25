using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Movie
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
        public List<MovieGenre> MovieGenres { get; set; } =  new List<MovieGenre>();
        public List<MovieCast> Cast { get; set; }= new List<MovieCast>();
        public List<MovieCrew> Crew { get; set; } = new List<MovieCrew >();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Watchlist> Watchlists { get; set; } = new List<Watchlist>();

    }
}