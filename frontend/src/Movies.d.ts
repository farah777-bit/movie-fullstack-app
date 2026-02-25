// tmdb.types.ts

// استجابة عامة لأي بيانات بصفحات (page / total_pages / results)
export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// ملخص فيلم كما يأتي في discover/movie أو movie/popular
export interface TmdbMovieSummary {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; // بصيغة YYYY-MM-DD
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// استجابة discover/movie
export type TmdbDiscoverMovieResponse = TmdbPaginatedResponse<TmdbMovieSummary>;

// أنواع مساعدة لتفاصيل الفيلم
export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TmdbProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TmdbProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TmdbSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// تفاصيل فيلم واحد من endpoint: /movie/{movie_id}
export interface TmdbMovieDetails extends TmdbMovieSummary {
  belongs_to_collection: TmdbCollection | null;
  budget: number;
  genres: TmdbGenre[];
  homepage: string | null;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: TmdbProductionCompany[];
  production_countries: TmdbProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: TmdbSpokenLanguage[];
  status: string;   // مثل "Released"
  tagline: string | null;
}

