using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.CreditsDto
{
    public class MovieCreditsDto
    {
        public List<MovieCastDto> Cast { get; set; } = new();
        public List<MovieCrewDto> Crew { get; set; } = new();
    }
}