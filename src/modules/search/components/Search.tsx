import { FC, useState } from 'react';
import { useQuery } from 'react-query';

// core
import SearchInput from '@core/components/shared/SearchInput';
import GridView from '@core/components/shared/GridView';

// modules
import Poster from '../../poster/components/Poster';

// interfaces
import { IType } from '../interfaces/search.interface';

// services
import api from '@core/services/api';

class IMovie {
    poster_path: string|null;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string|null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

class ITvShow {
    poster_path: string|null;
    popularity: number;
    id: number;
    backdrop_path: string|null;
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
    known_for: IMovie[]|ITvShow[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string|null;
}

type MediaType = 'movie' | 'tv' | 'person';

interface IResponse {
    page: number;
    results: IMovie[]|ITvShow[]|IPerson[];
    total_pages: number;
    total_results: number;
    media_type: MediaType;
}

const Search: FC = () => {

    const [term, setTerm] = useState<string|null>(null);
    const [type, setType] = useState<IType|null>(null);

    const fetchSearchedData = async (): Promise<IResponse|undefined> => {

        const config = {
            params: {
                query: term,
            },
        }

        const { data } = await api.get(`/search/${type?.value}`, config);

        return { ...data, media_type: type?.value };
    }

    const { data, status } = useQuery(['searchedData', term, type], fetchSearchedData, { enabled: !!(term && type) });

    return (
        <section className="flex flex-col items-center px-6 lg:px-24">
            <SearchInput icon="fas fa-search" placeholder="Search..." term={term} setTerm={setTerm} type={type} setType={setType} />
            <GridView>
                {status === 'success' && data?.results.map((result: any) => <Poster key={result.id} img={result.poster_path || result.profile_path} mediaType={data.media_type} />)}
            </GridView>
        </section>
    );
}

export default Search;
