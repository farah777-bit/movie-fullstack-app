using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.CreditsDto
{
    public class MovieCrewDto : PersonBaseDto
    {
        public string? Job { get; set; }
        public string? Department { get; set; }
    }
}