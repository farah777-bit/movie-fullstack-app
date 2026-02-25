using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.CommentDto
{
    public class UpdateCommentRequestDto
    {
        public string Text { get; set; } = string.Empty;
    }
}