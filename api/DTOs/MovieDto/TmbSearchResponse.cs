using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace api.DTOs.MovieDto
{
    public class TmbSearchResponse<T>
    {
        [JsonProperty("results")]
        public List<T> Results { get; set; } = new();
    }
}