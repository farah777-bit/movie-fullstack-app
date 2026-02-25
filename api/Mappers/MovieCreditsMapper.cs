using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.CreditsDto;
using api.Model;

namespace api.Mappers
{
    public static class MovieCreditsMapper
    {
        public static MovieCastDto ToMovieCastDto(this MovieCast entity)
        {
            return new MovieCastDto
            {
                PersonId = entity.PersonId,
                Name = entity.Person?.Name ?? string.Empty,
                ProfilePhoto = entity.Person?.ProfilePath,
                Character = entity.Character,
                Order = entity.Order
            };
        }

        public static MovieCrewDto ToMovieCrewDto(this MovieCrew entity)
        {
            return new MovieCrewDto
            {
                PersonId = entity.PersonId,
                Name = entity.Person?.Name ?? string.Empty,
                ProfilePhoto = entity.Person?.ProfilePath,
                Job = entity.Job,
                Department = entity.Department
            };
        }

        public static MovieCreditsDto ToMovieCreditsDto(
            this IEnumerable<MovieCast> casts,
            IEnumerable<MovieCrew> crews)
        {
            return new MovieCreditsDto
            {
                Cast = casts
                    .OrderBy(c => c.Order)
                    .Select(c => c.ToMovieCastDto())
                    .ToList(),

                Crew = crews
                    .OrderBy(c => c.Department)
                    .ThenBy(c => c.Job)
                    .Select(c => c.ToMovieCrewDto())
                    .ToList()
            };
        }
    }
}
