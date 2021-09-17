import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import api from '@core/services/api';

const DetailsPage: FC = () => {
    const { state } = useLocation<any>();

    const fetchDetails = async (): Promise<any | undefined> => {
        if (!state?.release_date) {
            const { data } = await api.get(`/tv/${state?.id}`);
            return data;
        } else {
            const { data } = await api.get(`/movie/${state?.id}`);
            return data;
        }
    };

    const {
        data: details,
        isLoading,
        isFetchedAfterMount,
    } = useQuery('mediaDetails', fetchDetails, { refetchOnMount: 'always' });

    return (
        <div className="w-screen h-screen relative overflow-hidden">
            {!isFetchedAfterMount ||
                (!isLoading && (
                    <>
                        <div
                            className={`absolute w-full left-80 ${
                                details?.release_date ? 'inset-y-1/2' : 'top-72'
                            } z-10`}
                        >
                            {details?.release_date ? (
                                <p className="text-white text-2xl">
                                    {details?.release_date?.substring(0, 4)}
                                </p>
                            ) : (
                                <p className="text-white text-2xl">
                                    {details?.first_air_date?.substring(0, 4)} -{' '}
                                    {details?.last_air_date &&
                                        details?.last_air_date.substring(0, 4)}
                                </p>
                            )}
                            <div className="flex items-center mt-4 text-white">
                                <a
                                    href={
                                        details?.imdb_id &&
                                        `https://www.imdb.com/title/${details?.imdb_id}`
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white text-6xl font-bold no-underline hover:underline cursor-pointer"
                                    style={{
                                        textDecorationColor: '#f59e09',
                                        color: 'inherit',
                                    }}
                                >
                                    {details?.title || details?.name}
                                </a>
                                <span
                                    className={`flex h-9 items-center ${
                                        details?.status !== 'Released'
                                            ? 'bg-green-500'
                                            : 'bg-yellow-500'
                                    } text-white text-lg font-bold p-2 ml-10 rounded-lg`}
                                >
                                    {details?.status}
                                </span>
                            </div>
                            <p className="w-1/2 text-white text-lg mt-8 leading-8">
                                {details?.overview}
                            </p>
                            <div className="mt-4">
                                <i className="fas fa-star text-yellow-400 text-2xl"></i>
                                <span className="text-white text-2xl font-bold ml-3">
                                    {details?.vote_average.toFixed(1)}
                                </span>
                            </div>
                            {!details?.release_date && (
                                <div className="flex justify-evenly w-1/2 text-white font-bold text-6xl mt-24">
                                    <div className="bg-yellow-500 rounded-xl px-10 py-8 opacity-90">
                                        <span>
                                            E{details?.number_of_seasons}
                                        </span>
                                    </div>
                                    <div className="bg-yellow-500 rounded-xl px-10 py-8 opacity-90">
                                        <span>
                                            S{details?.number_of_episodes}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-full h-full absolute bg-black opacity-70"></div>
                        <img
                            className="w-full h-full object-cover"
                            src={`${process.env.REACT_APP_TMDB_IMAGES_URL}${details?.backdrop_path}`}
                            alt="details-bg"
                        />
                    </>
                ))}
        </div>
    );
};

export default DetailsPage;
