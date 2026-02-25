
import React, { SyntheticEvent } from 'react'
import { TmdbMovieSummary } from '../../../Movies';
import { MovieListDto, WatchlistItemDto } from '../../../types/movies';

interface Props  {
    onWatchItemCreate : (e: SyntheticEvent)=> void; 
    item: number;
}

const AddToWatchList = ({onWatchItemCreate, item}: Props) => {
  return (
    <form onSubmit={onWatchItemCreate}>
        <input readOnly={true} hidden={true} value={item}/>
        <button className="mt-auto bg-indigo-600 hover:bg-indigo-700 transition text-white text-sm py-2 rounded-lg p-5">
          Add to Watchlist
        </button>
    </form>
  )
}

export default AddToWatchList