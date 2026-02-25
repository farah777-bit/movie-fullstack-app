import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react'
import './Search.css'
interface Props {
  onSearchSubmit: (e: SyntheticEvent) => void;
  search: string | undefined;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({onSearchSubmit, search, handleSearchChange}: Props) => {

  return (
    <div className="w-full flex justify-center py-8">
      <form
        onSubmit={onSearchSubmit}
        className="flex w-full max-w-xl bg-slate-900 rounded-full shadow-lg overflow-hidden border border-slate-700 focus-within:ring-2 focus-within:ring-indigo-600 transition"
      >
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search for a movie..."
          className="
            flex-grow
            px-5 py-3
            bg-transparent
            text-slate-100
            placeholder-slate-400
            outline-none
            text-sm
          "
        />

        <button
          type="submit"
          className="
            px-6
            bg-indigo-600
            text-white
            font-semibold
            hover:bg-indigo-700
            transition
          "
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Search