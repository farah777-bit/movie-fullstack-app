import axios, {Axios, AxiosResponse, isAxiosError} from "axios";
import { CommentDetailsDto, CreateCommentDto, MovieCredits, MovieListDto, PagedResponse, UpdateCommentRequestDto, UpdateWatchlistWatchedDto, WatchlistItemDto } from "./types/movies";
import { CommentDto, CommentPostDto } from "./types/comments";
import { handelError } from "./Helper/ErrorHandler";
import { error } from "console";


const API_BASE = "http://localhost:5258"
export const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



export const searchMovies = async (query : string):Promise<MovieListDto[]|string>=>{
    try {
        const res = await api.get<MovieListDto[]>(`/api/movie`,
        {
            params: { movieTitle: query }
        });
        return res.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("*** error *** : " ,error.message)
            return "movie not found";
        }
        console.log("searchMovies error:", error)
        return "An unexpected error !!!";
    }
    
};
export const getAllMovies = async (pageNumber : number , pageSize : number)=>{
    
    const res = await api.get<MovieListDto[]>(
        `/api/movie`,
        { params: { pageNumber, pageSize } }
    );
    console.log(res.data)
        return res.data;
};

export const getMovieDetails = async (movieId : number): Promise<MovieListDto| string> => {
    try {
        const res = await api.get<MovieListDto>(`/api/movie/${movieId}`);
        console.log(res.data)
            return res.data;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message);
            return error.message;
        }
        else {
            console.log("unexpected errpr: ", error);
            return "An unexpected Error has occured.";
        }
    }
}

export const getMovieCredits = async (movieId: number): Promise<MovieCredits | string>=> {
    try {
        const res = await api.get<MovieCredits>(`/api/movie/${movieId}/credits
            `);
            return res.data;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message);
            return error.message;
        }
        else {
            console.log("unexpected errpr: ", error);
            return "An unexpected Error has occured.";
        }
    }  
}
export const getWatchlist = async (): Promise<WatchlistItemDto[] | string>=> {
    try {
        const res = await api.get<WatchlistItemDto[]>(`/api/watchlist`);
            return res.data;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message);
            return error.message;
        }
        else {
            console.log("unexpected errpr: ", error);
            return "An unexpected Error has occured.";
        }
    }  
}
export const addToWatchlist = async (movieId: number): Promise<WatchlistItemDto | string>=> {
    try {
        const res = await api.post(`/api/watchlist/${movieId}`);
            return res.data;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message);
            return error.message;
        }
        else {
            console.log("unexpected errpr: ", error);
            return "An unexpected Error has occured.";
        }
    }  
}
export const deleteFromWatchlist = async (movieId:number): Promise<void>=> {
    await api.delete(`/api/watchlist/${movieId}`)
}
// src/api.ts

export const updateWatchlistWatched = async ( movieId: number, isWatched: boolean) => {
    const dto: UpdateWatchlistWatchedDto = { isWatched };

    const res = await api.patch(
        `/api/watchlist/${movieId}/watched`,
        dto,
      
  );

return res.status; // 204
};

export const CommentPost = async ( text: string, movieId: number) => {
    try {
        const data = await api.post<CommentPostDto>(`/api/comment/${movieId}`, {
     
            text:text
        })
        return data
    } catch (error) {
        handelError(error)
        throw error
    }
}
export const CommentGet = async ( movieId: number) => {
    try {
        const data = await api.get<CommentDto[]>(`/api/comment/${movieId}`)
        return data
    } catch (error) {
        handelError(error)
        throw error
    }
}

export const deleteComment = async (id: number) => {
    const res = await api.delete(`/api/comment/${id}`);
    return res.data;
};

