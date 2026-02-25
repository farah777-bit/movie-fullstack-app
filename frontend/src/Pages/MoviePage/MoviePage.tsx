// src/pages/MoviePage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { MovieCredits, MovieListDto } from "../../types/movies";
import { getMovieCredits, getMovieDetails } from "../../api";
import MovieComment from "../../Components/MovieComment/MovieComment";



type LoadState = "idle" | "loading" | "success" | "error";

function formatRuntime(runtime: number | null | undefined): string | null {
  if (!runtime) return null;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (!hours) return `${minutes} min`;
  if (!minutes) return `${hours} h`;
  return `${hours}h ${minutes} min`;
}

function getYear(date: string | null | undefined): string | null {
  if (!date) return null;
  return date.split("-")[0] ?? null;
}

const IMAGE_BASE = "https://image.tmdb.org/t/p";
const CREDITS_IMAGE_BASE = "https://image.tmdb.org/t/p/w185";

export default function MoviePage() {
  const { id } = useParams();
  const movieId = Number(id);

  const [movie, setMovie] = useState<MovieListDto | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from as string | undefined;
  
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!movieId || Number.isNaN(movieId)) {
        setState("error");
        setError("Invalid movie id.");
        return;
      }

      try {
        setState("loading");
        setError(null);

        const movieData = await getMovieDetails(movieId);
        if (cancelled) return;
        if (typeof movieData === "string") {
          setError(movieData);
        } else {
          setMovie(movieData)
          const movieCredits = await getMovieCredits(movieId);
          if (cancelled) return;
          if (typeof movieCredits === "string") {
            setError(movieCredits);
          } else {
            setCredits(movieCredits)
            console.log(movieCredits)
          }
          console.log(movieData)
        }

        if (!cancelled) setState("success");
      } catch (e: any) {
        if (cancelled) return;
        setState("error");
        setError("Movie not found.");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  const year = useMemo(() => getYear(movie?.releaseDate), [movie?.releaseDate]);

  const backdropUrl = movie?.backdropPath
    ? `${IMAGE_BASE}/w1280${movie.backdropPath}`
    : undefined;

  const posterUrl = movie?.posterPath
    ? `${IMAGE_BASE}/w500${movie.posterPath}`
    : undefined;

  const director = credits?.crew?.find((c) => c.job === "Director");
  const writers = credits?.crew
    ?.filter((c) => c.department === "Writing")
    ?.slice(0, 3);

  const topCast = credits?.cast?.slice(0, 10) ?? [];

  // لو لاحقاً أضفتِ runtime للـ DTO
  const runtimeText = formatRuntime((movie as any)?.runtime ?? null);

  if (state === "loading" || state === "idle") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-slate-300">Loading movie…</div>
      </div>
    );
  }

  if (state === "error" || !movie) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-slate-900/40 ring-1 ring-white/10 p-6">
          <div className="text-xl font-semibold">Movie not found</div>
          <p className="mt-2 text-slate-300">{error ?? "Something went wrong."}</p>
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex rounded-full bg-sky-500 px-4 py-2 text-slate-950 font-medium hover:bg-sky-400 transition"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Backdrop */}
      <div className="relative w-full h-[280px] md:h-[420px]">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-40"
          />
        ) : (
          <div className="w-full h-full bg-slate-900/40" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />

        {/* Header */}
        <div className="absolute inset-0">
          <div className="mx-auto h-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-full items-end gap-6 pb-6 md:pb-10">
              {/* Poster */}
              <div className="hidden md:block shrink-0">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="h-72 w-48 rounded-2xl shadow-2xl shadow-black/70 ring-1 ring-white/10 object-cover"
                  />
                ) : (
                  <div className="flex h-72 w-48 items-center justify-center rounded-2xl bg-slate-800/70 text-sm text-slate-400 ring-1 ring-white/10">
                    No poster
                  </div>
                )}
              </div>

              {/* Title + Meta */}
              <div className="flex-1 space-y-3 md:space-y-4">
                <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
                  <h1 className="text-2xl font-semibold md:text-4xl lg:text-5xl">
                    {movie.title}
                  </h1>
                  {year && (
                    <span className="text-lg text-slate-300 md:text-2xl">({year})</span>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200 md:text-sm">
                  {movie.releaseDate && (
                    <span className="rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-white/10">
                      {movie.releaseDate}
                    </span>
                  )}

                  {runtimeText && (
                    <span className="rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-white/10">
                      {runtimeText}
                    </span>
                  )}

                  {!!movie.movieGenres?.length && (
                    <span className="inline-flex flex-wrap gap-2">
                      {movie.movieGenres.slice(0, 6).map((g) => (
                        <span
                          key={g}
                          className="rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-white/10"
                        >
                          {g}
                        </span>
                      ))}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex flex-wrap items-center gap-4 pt-1 md:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <span className="text-xl md:text-2xl">★</span>
                      <span className="text-lg font-semibold md:text-2xl">
                        {movie.voteAverage?.toFixed?.(1) ?? "0.0"}
                      </span>
                    </div>
                    <span className="text-xs text-slate-300 md:text-sm">
                      {movie.voteAverage?.toLocaleString?.() ?? ""} votes
                    </span>
                  </div>

                  {director && (
                    <div className="text-xs md:text-sm text-slate-300">
                      <span className="text-slate-200 font-medium">Director:</span>{" "}
                      {director.name}
                    </div>
                  )}
                  {writers?.length ? (
                    <div className="text-xs md:text-sm text-slate-300">
                      <span className="text-slate-200 font-medium">Writers:</span>{" "}
                      {writers.map((w) => w.name).join(", ")}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Poster for mobile */}
              <div className="md:hidden shrink-0">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="h-28 w-20 rounded-xl ring-1 ring-white/10 object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-slate-900/30 ring-1 ring-white/10 p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold">Overview</h2>
              <p className="mt-3 text-slate-300 leading-relaxed">
                {movie.overview?.trim?.() ? movie.overview : "No overview available."}
              </p>
            </div>

            {/* Cast */}
            <div className="rounded-2xl bg-slate-900/30 ring-1 ring-white/10 p-5 md:p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg md:text-xl font-semibold">Top Cast</h2>

                {!credits && (
                  <span className="text-xs text-slate-400">(Credits not available)</span>
                )}
              </div>

              {credits?.cast?.length ? (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {credits.cast.slice(0, 12).map((c) => (
                    <div
                      key={`${c.personId}- ${c.order}`}
                      className="rounded-2xl bg-slate-950/40 ring-1 ring-white/10 p-3"
                    >
                      {/* صورة الممثل */}
                      <div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-slate-800">
                        {c.profilePhoto ? (
                          <img
                            src={`${CREDITS_IMAGE_BASE}${c.profilePhoto}`}
                            alt={c.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* الاسم */}
                      <div className="mt-2 text-sm font-medium">{c.name}</div>

                      {/* الدور */}
                      {!!c.character && (
                        <div className="text-xs text-slate-400">{c.character}</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-slate-400 text-sm">
                  {credits ? "No cast data." : "Credits not loaded yet."}
                </p>
              )}
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/30 ring-1 ring-white/10 p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold">Details</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-400">Release date</span>
                  <span className="text-slate-100">{movie.releaseDate ?? "-"}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-400">Rating</span>
                  <span className="text-slate-100">
                    {movie.voteAverage?.toFixed?.(1) ?? "0.0"} / 10
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-400">Genres</span>
                  <span className="text-slate-100 text-right">
                    {Array.isArray((movie as any).movieGenres) && (movie as any).movieGenres.length > 0
                      ? (movie as any).movieGenres.join(", ")
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900/30 ring-1 ring-white/10 p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold">Actions</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={() => (from ? navigate(from) : navigate("/search"))}>
                  Back to search
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 transition"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MovieComment movieId={movieId}/>
    </div >
  );
}
