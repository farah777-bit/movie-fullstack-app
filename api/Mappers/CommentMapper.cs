using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.CommentDto;
using api.Model;

namespace api.Mappers
{
    public static class CommentMapper
    {
        public static CommentDetailsDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDetailsDto
            {
                Id = commentModel.Id,
                CreatedAt = commentModel.CreatedAt,
                MovieId = commentModel.MovieId,
                UserId = commentModel.UserId,
                Text = commentModel.Text,
                CreatedBy = commentModel.User.UserName!
            };
        }

        public static Comment ToCommentFromCreate(this CreateCommentDto commentDto, int movieId)
        {
            return new Comment
            {
                MovieId = movieId,
                Text = commentDto.Text
            };
        }
        public static Comment ToCommentFromUpdate(this UpdateCommentRequestDto commentDto)
        {
            return new Comment
            {
                Text = commentDto.Text,

            };
        }
    }
}