using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.CommentDto;
using api.Extentions;
using api.Interfaces;
using api.Mappers;
using api.Model;
using api.Serviecs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IMovieRepository _movieRepo;

        private readonly ITMDBService _tmdbService;

        private readonly UserManager<AppUser> _userManager;

        public CommentController(ApplicationDBContext context, ICommentRepository commentRepo, UserManager<AppUser> userManager, IMovieRepository movieRepo, ITMDBService tMDBService)
        {
            _commentRepo = commentRepo;
            _movieRepo = movieRepo;
            _userManager = userManager;
            _tmdbService = tMDBService;

        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentRepo.GetAllCommentsAsync();
            var commentsDto = comments.Select(s => s.ToCommentDto());
            return Ok(commentsDto);
        }

        [HttpGet("{movieid:int}")]
        public async Task<IActionResult> GetCommentByMovieId([FromRoute] int movieid)
        {
            var comment = await _commentRepo.GetCommentByMovieIdAsync(movieid);
            if (comment == null)
            {
                return NotFound();
            }
            else
            {
                var commentsDto = comment.Select(s => s.ToCommentDto()).ToList();
                
                return Ok(commentsDto);
            }
        }

        [Authorize]
        [HttpPost("{movieId:int}")]
        public async Task<IActionResult> CreateComment([FromRoute] int movieId, CreateCommentDto commentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var movie = await _movieRepo.GetMovieByIdAsync(movieId);
            if (movie == null)
            {
                return BadRequest("Movie does not exist ");
            }
            

            var appUser = await _userManager.GetUserAsync(User);


            var commentModel = commentDto.ToCommentFromCreate(movie.Id);
            commentModel.UserId = appUser!.Id;
            await _commentRepo.CreateCommentAsync(commentModel);
            return CreatedAtAction(nameof(GetCommentByMovieId), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
        {
            var comment = await _commentRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate());
            if (comment == null)
            {
                return NotFound("Comment not found ");
            }
            return Ok(comment.ToCommentDto());
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var comment = await _commentRepo.DeleteAsync(id);
            if (comment == null)
            {
                return NotFound("comment does not exist ");
            }
            return Ok(comment);
        }

    }
}