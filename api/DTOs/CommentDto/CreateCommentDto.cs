using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.CommentDto
{
    public class CreateCommentDto
    {
        [MaxLength(200, ErrorMessage ="Comment must be less than 200 chrecter")]
        public string Text { get; set; } = string.Empty;
    }
}