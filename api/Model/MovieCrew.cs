using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class MovieCrew
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public int PersonId { get; set; }
        public Person Person { get; set; }
        public string Job { get; set; }          // job مثل "Director"
        public string Department { get; set; }   // department مثل "Directing"
    }
}