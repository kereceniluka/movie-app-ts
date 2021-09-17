import { FC, useState } from 'react';
import { useQuery } from 'react-query';

// core
import SearchInput from '@core/components/shared/SearchInput';
import GridView from '@core/components/shared/GridView';

// modules
import Poster from '../../poster/components/Poster';

// interfaces
import { IType } from '../interfaces/search.interface';
import { IResponse } from '@core/interfaces/response.interface';

// services
import api from '@core/services/api';

const Search: FC = () => {
    const [term, setTerm] = useState<string | null>(null);
    const [type, setType] = useState<IType | null>(null);

    const fetchSearchedData = async (): Promise<IResponse | undefined> => {
        const config = {
            params: {
                query: term,
            },
        };

        const { data } = await api.get(`/search/${type?.value}`, config);

        return { ...data, media_type: type?.value };
    };

    const fetchPopularMovies = async (): Promise<IResponse | undefined> => {
        const { data } = await api.get('/trending/movie/week');

        return data;
    };

    const { data, isLoading } = useQuery(
        ['searchedData', term, type],
        fetchSearchedData,
        { enabled: !!(term && type) }
    );

    const { data: popularMovies, isLoading: isPopularMoviesLoading } = useQuery(
        'popularMovies',
        fetchPopularMovies
    );

    return (
        <section className="flex flex-col items-center px-6 lg:px-24 my-12">
            <SearchInput
                icon="fas fa-search"
                placeholder="Search..."
                term={term}
                setTerm={setTerm}
                type={type}
                setType={setType}
            />
            <GridView>
                {!isPopularMoviesLoading && !term ? (
                    <>
                        {popularMovies?.results
                            .slice(0, 18)
                            .map((movie: any) => (
                                <Poster
                                    key={movie.id}
                                    data={movie}
                                    mediaType={movie.media_type}
                                />
                            ))}
                    </>
                ) : (
                    <>
                        {!isLoading &&
                            data?.results.map((result: any) => (
                                <Poster
                                    key={result.id}
                                    data={result}
                                    mediaType={data.media_type}
                                />
                            ))}
                    </>
                )}
            </GridView>
        </section>
    );
};

export default Search;
