class IMovie {
    poster_path: string | null;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

class ITvShow {
    poster_path: string | null;
    popularity: number;
    id: number;
    backdrop_path: string | null;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}

class IPerson {
    adult: boolean;
    gender: number;
    id: number;
    known_for: IMovie[] | ITvShow[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string | null;
}

type MediaType = 'movie' | 'tv' | 'person';

export interface IResponse {
    page: number;
    results: IMovie[] | ITvShow[] | IPerson[];
    total_pages: number;
    total_results: number;
    media_type: MediaType;
}
