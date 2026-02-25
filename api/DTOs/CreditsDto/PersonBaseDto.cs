using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.CreditsDto
{
    public abstract class PersonBaseDto
    {
        public int PersonId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ProfilePhoto { get; set; } // أو ProfilePath حسب تسميتك
    }
}