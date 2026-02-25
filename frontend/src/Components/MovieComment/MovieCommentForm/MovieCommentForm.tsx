import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { CommentFormInput } from "../../../types/comments"

type Props = {
    movieId: number
    handleComment: (e: CommentFormInput) => Promise<boolean>;
}


const validation = Yup.object().shape({
    text: Yup.string().required("Content is Required"),

})

const MovieCommentForm = ({ movieId, handleComment }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } =
        useForm<CommentFormInput>({ resolver: yupResolver(validation) });
    const onSubmit = async (data: CommentFormInput) => {
        const ok = await handleComment(data);
        if (ok) {
            reset({ text: "" })
        }
    }

    return (
        <form className="mt-4 ml-4" onSubmit={handleSubmit(onSubmit)}>

            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                    Your comment
                </label>
                <textarea 
                    id="comment"
                    rows={6}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    {...register("text")}
                ></textarea>
            </div>
            <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
                Post comment
            </button>
        </form>
    )
}

export default MovieCommentForm