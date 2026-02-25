import React, { SyntheticEvent } from 'react'
import Card from '../Card/Card'
import { TmdbMovieSummary } from '../../Movies'
import { v4 as uuidv4 } from "uuid";
import { MovieListDto } from '../../types/movies';

interface Props {
  searchResult : MovieListDto[];
  onWatchItemCreate : (e:SyntheticEvent)=> void;
}

const CardList = ({searchResult,onWatchItemCreate}: Props) => {
   if (!searchResult || searchResult.length === 0) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-slate-400">
        <h1 className="text-lg">No result</h1>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
          max-w-7xl
          mx-auto
        "
      >
        {searchResult.map((result) => (
          <Card
            id={result.id}   
            key={uuidv4()}            
            searchResult={result}
            onWatchItemCreate={onWatchItemCreate}
          />
        ))}
      </div>
    </div>
  );
};


export default CardList