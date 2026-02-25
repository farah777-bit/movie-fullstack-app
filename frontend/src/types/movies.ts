export interface MovieListDto {
    id: number;
    title: string;
    posterPath: string | null;
    releaseDate: string;
    voteAverage: number;
    overview: string;
    backdropPath: string;
    movieGenres: string[];
    comments?: CommentDetailsDto[];
}
export interface MovieCredits {
    cast: MovieCast[];
    crew: MovieCrew[];
}
export interface MovieCrew extends PersonBase {
    job?: string | null;
    department?: string | null;
}
export interface MovieCast extends PersonBase {
    character?: string | null;
    order: number;
}
export interface PersonBase {
    personId: number;
    name: string;
    profilePhoto?: string | null;
}
export interface WatchlistItemDto {
    movieId: number;
    title: string;
    posterPath: string | null;
    releaseDate: string| null;
    voteAverage: number  | null;
    overview: string | null;
    addedAt: string;
    isWatched: boolean
}
export type UpdateWatchlistWatchedDto = {
    isWatched: boolean;
};

export type PagedResponse<T> = {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
};

export type CommentDetailsDto = {
    id: number;
    movieId: number;
    userId: string;
    text: string;
    createdAt: string;   // من الباك غالباً JSON string (ISO)
    createdBy: string;
};
export type CreateCommentDto = {
    text: string;
};

export type UpdateCommentRequestDto = {
    text: string;
};
type CommentFormInputs = {
    title: string;
    content: string
}