export interface ITrendingMovie {
    genre_ids: number[];
    original_language: string;
    original_title: string;
    id: number;
    video: boolean;
    vote_average: number;
    overview: string;
    release_date: string;
    vote_count: number;
    title: string;
    adult: boolean;
    backdrop_path: string | null;
    poster_path: string | null;
    popularity: number;
    media_type: string;
}

export interface IMovieGenre {
    id: number;
    name: string;
}