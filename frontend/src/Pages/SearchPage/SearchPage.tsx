import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Hero/Hero'
import Search from '../../Components/Search/Search'
import WatchList from '../../Components/Watchs/WatchList/WatchList'
import CardList from '../../Components/CardList/CardList'
import { TmdbMovieSummary } from '../../Movies'
import { addToWatchlist, deleteFromWatchlist, getAllMovies, getWatchlist, searchMovies } from '../../api'
import { MovieListDto, WatchlistItemDto } from '../../types/movies'
import { useSearchParams } from 'react-router-dom'

type Props = {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<MovieListDto[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [watchlistError, setWatchlistError] = useState<string | null>(null);
  const [watchListValues, setWatchListValues] = useState<WatchlistItemDto[]>([]);
  const [params, setParams] = useSearchParams();
  const handleSearchchange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  }
  const onLocalUpdate = (movieId: number, isWatched: boolean) => {
    setWatchListValues(prev => prev.map(x => x.movieId === movieId ? { ...x, isWatched } : x));
  }
  const onSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const q = search.trim();
    setParams(q ? { q } : {});
  };


  const q = params.get("q") ?? "";
  useEffect(() => {
    setSearch(q);

    const run = async () => {
      if (!q.trim()) {
        setSearchResult([]);
        setServerError(null);
        return;
      }

      const result = await searchMovies(q);
      if (typeof result === "string") {
        setServerError(result);
        setSearchResult([]);
      } else {
        setServerError(null);
        setSearchResult(result);
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  useEffect(() => {
    const load = async () => {
      const result = await getWatchlist();
      console.log("result===")
      console.log(result)
      if (typeof result === "string") {
        setWatchlistError(result);
        setWatchListValues([]);
      } else {
        setWatchlistError(null);
        setWatchListValues(result);
      }
    };
    load();
  },[])

  const onWatchItemCreate = async (e: any) => {
    e.preventDefault();
    const movieId = Number(e.target[0].value);
    console.log(movieId)
    const exists = watchListValues.some(x => x.movieId === movieId);
    if (exists) return;

    const result = await addToWatchlist(movieId);
    if (result === "string") {
      setServerError(result);
      return;
    }
    const createdItem = result as WatchlistItemDto;

    setWatchListValues(prev => [...prev, createdItem]);
  }

  const onItemDelete = async (e: any) => {
    e.preventDefault();
    const movieId = Number(e.target[0].value);
    try {
      await deleteFromWatchlist(movieId);
      setWatchListValues(prev => prev.filter(x => x.movieId != movieId));
    }
    catch (err) {
      console.log(err);
      setServerError("Faild to Delete the movie from your watchlist")
    }
  }

  useEffect(()=> {
    console.log("RENDER: ", searchResult?.length)
  },[searchResult])
// Pagination

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadAllMovies = async (page = 1) => {

    try {
      setServerError(null);
      const data = await getAllMovies(page, pageSize);
      
      setTotalCount(data.length)
      if (data.length === 0 && page > 1) {
        return;
      }
      setSearchResult(data);
      setPageNumber(page);
    } catch (err) {
      console.error(err);
      setServerError("Failed to load movies");
    }
  };

  return (
    <div className="App">
      
      <button
        onClick={() => loadAllMovies(1)}
        className="px-5 py-2 rounded-lg bg-slate-700 text-slate-100 hover:bg-slate-600"
      >
        Show all
      </button>

      {/* Pagination Controls */}
      <div className="flex items-center gap-3 mt-4">
        <button
          disabled={pageNumber === 1}
          onClick={() => loadAllMovies(pageNumber - 1)}
          className="px-4 py-2 rounded-md bg-slate-700 text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
        >
          Prev
        </button>

        <div className="text-sm text-slate-200">
          Page <span className="font-semibold">{pageNumber}</span> / {totalPages}
          <span className="opacity-70"> • {totalCount} movies</span>
        </div>

        <button
          disabled={totalCount===0}
          onClick={() => loadAllMovies(pageNumber + 1)}
          className="px-4 py-2 rounded-md bg-slate-700 text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
        >
          Next
        </button>
      </div>


      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchchange} />
      {watchlistError && <h1>{watchlistError}</h1>}
      {serverError && <h1>{serverError}</h1>}
      <WatchList WatchListValues={watchListValues} onItemDelete={onItemDelete} onLocalUpdate={onLocalUpdate } />
      <CardList searchResult={searchResult} onWatchItemCreate={onWatchItemCreate} />
    </div>
  )
}

export default SearchPage