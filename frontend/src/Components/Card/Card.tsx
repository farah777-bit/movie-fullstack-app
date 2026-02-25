import React, { SyntheticEvent } from 'react'
import { TmdbMovieSummary } from '../../Movies';
import AddToWatchList from '../Watchs/AddToWatchs/AddToWatchs';
import { Link, useLocation } from 'react-router-dom';
import { MovieListDto } from '../../types/movies';

// import './Card.css';
interface Props {
  id: number;
  searchResult: MovieListDto;
  onWatchItemCreate: (e: SyntheticEvent) => void;
}

const Card = ({ id, searchResult, onWatchItemCreate }: Props) => {
  const posterUrl = searchResult.posterPath
    ? `https://image.tmdb.org/t/p/w200${searchResult.posterPath}`
    : "";
  const location = useLocation();
  return (
    <div className='bg-slate-900 text-slate-100 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-200 flex flex-col'>
      <img src={posterUrl} alt={searchResult.title} className="h-52 w-full object-cover" />
      <div className="p-4 flex flex-col gap-2 flex-1">

        
        <div className="flex justify-between items-center">
          <Link
            to={`/movie/${searchResult.id}`}
            state={{ from: location.pathname + location.search }}
            className="font-semibold text-base line-clamp-1"
          >
            {searchResult.title}
          </Link>

          <span className="bg-yellow-400 text-slate-900 text-xs px-2 py-1 rounded-full font-bold">
            {searchResult.voteAverage?.toFixed(1)}
          </span>
        </div>

        <p className="text-xs text-slate-400">
          {searchResult.releaseDate}
        </p>

        <p className="text-sm text-slate-300 line-clamp-3">
          {searchResult.overview}
        </p>

        <AddToWatchList onWatchItemCreate={onWatchItemCreate} item={searchResult.id} />

      </div>
    </div >

  )
}

export default Card