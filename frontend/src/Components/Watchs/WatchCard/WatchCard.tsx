import React, { SyntheticEvent } from 'react'
import DeleteWatchItem from '../DeleteWatchItem/DeleteWatchItem';
import { TmdbMovieSummary } from '../../../Movies';
import { Link } from 'react-router';
import { MovieListDto, WatchlistItemDto } from '../../../types/movies';
import ToggelIsWatched from '../ToggelIsWatched/ToggelIsWatched';

interface Props  {
    id: number;
    WatchCardValue : WatchlistItemDto;
   onItemDelete: (e: SyntheticEvent) => void;
  onLocalUpdate: (movieId: number, isWatched: boolean) => void;
  
}

const WatchCard = ({ id, WatchCardValue, onItemDelete, onLocalUpdate }: Props) => {
  
  return (
     <div className="bg-gray-900 text-gray-100 rounded-xl shadow-lg p-1 pl-4 flex items-center justify-between hover:bg-gray-800 transition">

      <Link to={`/movie/${WatchCardValue.movieId}`} className="text-lg font-semibold truncate">
        {WatchCardValue.title}  {(WatchCardValue.releaseDate?? "").slice(0,4)} |
        
        <span className='text-lg font-semibold md:text-2xl' >
          <span className="text-xl md:text-2xl"> ★ </span>
          {WatchCardValue.voteAverage!= null? WatchCardValue.voteAverage.toFixed(1): "N/A"} 
        </span>
      </Link>
      <ToggelIsWatched item={WatchCardValue} onLocalUpdate={onLocalUpdate} />
      <DeleteWatchItem onItemDelete={onItemDelete} WatchItemValue={WatchCardValue}/>

    </div>
  )
}

export default WatchCard