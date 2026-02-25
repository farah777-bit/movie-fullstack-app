import React from 'react'
import { CommentDto } from '../../../types/comments'
import { deleteComment } from '../../../api'

type Props = {
  comment: CommentDto,
  currentUser?: string,
  handleDelete: (id: number)=> void

}

const CommentListItem = ({ comment, currentUser, handleDelete }: Props) => {
  
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-2xl mt-3">

        <div className="flex flex-col w-full bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 rounded-xl p-4 border border-gray-800 shadow-sm">

          {/* header */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-200">
              @{comment.createdBy}
            </span>

            <span className="text-[11px] text-gray-500 font-medium">
              {new Date(comment.createdAt).toLocaleString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
            {currentUser === comment.createdBy && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-500 hover:text-red-400 text-xs font-medium transition"
              >
                Delete
              </button>
            )}
          </div>

          {/* comment text — البطل الحقيقي */}
          <p className="text-gray-100 text-sm leading-relaxed mt-1">
            {comment.text}
          </p>

        </div>
      </div>
    </div>
  )
}

export default CommentListItem