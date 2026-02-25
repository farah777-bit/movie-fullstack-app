import React, { useEffect, useState } from 'react'
import MovieCommentForm from './MovieCommentForm/MovieCommentForm';
import { CommentDto, CommentFormInput } from '../../types/comments';
import { CommentGet, CommentPost, deleteComment } from '../../api';
import { toast } from 'react-toastify';
import { CommentDetailsDto } from '../../types/movies';
import Spinner from '../Spinner/Spinner';
import CommentsList from './CommentsList/CommentsList';

type Props = {
  movieId: number;
}


const MovieComment = ({ movieId }: Props) => {
  const [comments, setComments] = useState<CommentDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    getComments();
  }, [])


  const handleDelete = async (id: number) => {
    try {
      await deleteComment(id);
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleComment = async (e: CommentFormInput): Promise<boolean> => {
    try {
      await CommentPost(e.text, movieId);
      toast.success("Comment created successfully!");
      getComments();
      return true;
    }

    catch (e: any) {
      toast.warning("Failed to create comment");
      return false;
    }

  };

  const getComments = () => {
    setLoading(true);
    CommentGet(movieId)
      .then((res) => {
        setLoading(false);
        setComments(res?.data!)
      })
  }
  return (
    <div className='flex flex-col'>
      {loading ? <Spinner /> : <CommentsList comments={comments!} handleDelete={handleDelete}/>}
      <MovieCommentForm handleComment={handleComment} movieId={movieId} />
    </div>
  )
}

export default MovieComment