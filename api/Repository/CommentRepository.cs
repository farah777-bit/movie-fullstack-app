using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Comment>> GetAllCommentsAsync()
        {
            return await _context.Comments.Include(a => a.User).ToListAsync();
        }

        public async Task<List<Comment>> GetCommentByMovieIdAsync(int movieId)
        {
            return await _context.Comments.Include(a => a.User)
            .Where(c=> c.MovieId == movieId).OrderByDescending(c=> c.CreatedAt)
            .ToListAsync();
        }

        public async Task<Comment> CreateCommentAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
            if (comment == null)
            {
                return null;
            }
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return comment;

        }

        public async Task<Comment?> UpdateAsync(int id, Comment commentModel)
        {
            var existingComment = await _context.Comments.Include(c => c.User).FirstOrDefaultAsync(c => c.Id==id);
            if (existingComment == null)
            {
                return null;
            }
            existingComment.Text = commentModel.Text;
            await _context.SaveChangesAsync();
            return existingComment;
        }

    }
}