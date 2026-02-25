import React, { SyntheticEvent } from 'react'
import { TmdbMovieSummary } from '../../../Movies';
import { MovieListDto, WatchlistItemDto } from '../../../types/movies';

interface Props  {
    onItemDelete : (e: SyntheticEvent)=> void ;
    WatchItemValue : WatchlistItemDto
}

const DeleteWatchItem = ({onItemDelete,WatchItemValue}: Props) => {
  return (
    <div>
        <form onSubmit={onItemDelete}>
            <input readOnly hidden={true} value={WatchItemValue.movieId}/>
             <button className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 
             text-white font-semibold shadow-md hover:shadow-lg 
             active:scale-95">
                Delete
            </button>
        </form>
    </div>
  )
}

export default DeleteWatchItem