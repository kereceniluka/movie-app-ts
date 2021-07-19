import { FC, useState } from 'react';
import { useQuery } from 'react-query';

// components
import SearchInput from '@core/components/shared/SearchInput';
import GridView from '@core/components/shared/GridView';
import Poster from '../../poster/components/Poster';

// interfaces
import { IType } from '../interfaces/search.interface';

// services
import api from '@core/services/api';

interface IMovie {
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

interface ITvShow {
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

interface IPerson {
    profile_path: string|null;
    adult: boolean;
    id: number;
    known_for: (IMovie[]|ITvShow[]) & { media_type: string };
    name: string;
    popularity: number;
}

type IData = IMovie|ITvShow|IPerson;

interface IResponse {
    page: number;
    results: IMovie[]|ITvShow[]|IPerson[];
    total_pages: number;
    total_results: number;
}

const Search: FC = () => {

    const [term, setTerm] = useState<string|null>(null);
    const [type, setType] = useState<IType|null>(null);

    const fetchSearchedData = async (): Promise<IResponse|undefined> => {
        if (!term || !type) return;

        const config = {
            params: {
                query: term,
            },
        }

        const { data } = await api.get(`/search/${type.value}`, config);

        return data;
    }

    const { data, status } = useQuery(['searchedData', term, type], fetchSearchedData);

    /* useEffect(() => {
        const timer = setTimeout(() => , 500);

        return () => clearTimeout(timer);
    }, [term, type]); */

    return (
        <section className="flex flex-col items-center">
            <SearchInput icon="fas fa-search" placeholder="Search..." term={term} setTerm={setTerm} type={type} setType={setType} />
            {/* <GridView>
                {status === 'success' && data?.results.map((result: IData) => <Poster key={result.id} img={result.poster_path||result.profile_path} />)}
            </GridView> */}
        </section>
    );
}

export default Search;
