using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.CreditsDto
{
    public class MovieCastDto : PersonBaseDto
    {
        public string? Character { get; set; }
        public int Order { get; set; }
    }
}