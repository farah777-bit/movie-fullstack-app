export type CommentPostDto = {
    title: string;
    content: string
}

export type CommentFormInput = {

    text: string
}
export interface CommentDto {
    id: number;
    movieId: number;
    userId: string;
    text: string;
    createdAt: string;
    createdBy: string;
}