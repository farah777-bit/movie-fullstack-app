import React, { SyntheticEvent } from 'react'
import WatchCard from '../WatchCard/WatchCard';
import { TmdbMovieSummary } from '../../../Movies';
import { v4 as uuidv4 } from "uuid";
import { MovieListDto, WatchlistItemDto } from '../../../types/movies';

interface Props {
    WatchListValues : WatchlistItemDto[];
    onItemDelete: (e: SyntheticEvent) => void
    onLocalUpdate: (movieId: number , isWatched : boolean) => void
    
}

const WatchList = ({ WatchListValues, onItemDelete, onLocalUpdate }: Props) => {
  return (
    <>
        <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
        🎬 My Watch List
      </h3>
        <ul className="space-y-3 list-none">
            {WatchListValues &&
                WatchListValues.map((WatchCardValue)=>{
                    return <WatchCard WatchCardValue={WatchCardValue} onLocalUpdate={onLocalUpdate} onItemDelete={onItemDelete} key={uuidv4()} id={WatchCardValue.movieId}/>
                })
            }
        </ul>
    </>
  )
}

export default WatchList