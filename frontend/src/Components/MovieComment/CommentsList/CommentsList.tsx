import React from 'react'
import { CommentDto } from '../../../types/comments';
import CommentListItem from '../CommentListItem/CommentListItem';
import { v4 as uuidv4 } from "uuid";
import { useAuth } from '../../../Context/UserAuth';

type Props = {
    comments: CommentDto[];
    handleDelete: (id: number)=> void
}

const CommentsList = ({ comments, handleDelete }: Props) => {
    const { user } = useAuth();
    return (
        <>
            <h1 className='w-full flex justify-center px-4'>Comments</h1>
            {Array.isArray(comments) ? comments.map((comment) => {
                return <CommentListItem key={uuidv4()} comment={comment} currentUser={user?.userName} handleDelete={handleDelete}/>
            }) : ""}
        </>
    )
}

export default CommentsList