import { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '@modules/auth/context/AuthContext';
import { useDocumentData } from 'react-firebase-hooks/firestore';

// assets
import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';

// interfaces
import { IPoster } from '../interfaces/poster.interface';

// components
import Checkbox from '@core/components/shared/Checkbox';

// services
import { firebaseFirestore } from '@core/services/firebase';

const Poster: FC<any> = ({ mediaType, isOnWatchlist, data }) => {
    const history = useHistory();

    const user = useContext(AuthContext);
    const [value, loading, error] = useDocumentData(
        firebaseFirestore.doc(`users/${user?.uid}`),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const dataExists =
        mediaType === 'movie'
            ? value?.watchlist?.movies.some(
                  (movie: any) => movie.id === data.id
              )
            : value?.watchlist?.tvShows.some(
                  (tvShow: any) => tvShow.id === data.id
              );

    const onAddToWatchlist = async () => {
        try {
            if (value && !dataExists) {
                if (mediaType === 'movie') {
                    await firebaseFirestore
                        .collection('users')
                        .doc(user?.uid)
                        .set({
                            watchlist: {
                                ...value.watchlist,
                                movies: [...value.watchlist.movies, data],
                                tvShows: [...value.watchlist.tvShows],
                            },
                        });
                } else {
                    await firebaseFirestore
                        .collection('users')
                        .doc(user?.uid)
                        .set({
                            watchlist: {
                                ...value.watchlist,
                                movies: [...value.watchlist.movies],
                                tvShows: [...value.watchlist.tvShows, data],
                            },
                        });
                }
            } else if (value && dataExists) {
                const prevWatchlistState = (
                    await firebaseFirestore
                        .collection('users')
                        .doc(user?.uid)
                        .get()
                ).data();
                const filteredData =
                    mediaType === 'movie'
                        ? prevWatchlistState?.watchlist.movies.filter(
                              (movie: any) => movie.id !== data.id
                          )
                        : prevWatchlistState?.watchlist.tvShows.filter(
                              (tvShow: any) => tvShow.id !== data.id
                          );

                if (mediaType === 'movie') {
                    await firebaseFirestore
                        .collection('users')
                        .doc(user?.uid)
                        .set({
                            watchlist: {
                                ...value.watchlist,
                                movies: [...filteredData],
                                tvShows: [
                                    ...prevWatchlistState?.watchlist.tvShows,
                                ],
                            },
                        });
                } else {
                    await firebaseFirestore
                        .collection('users')
                        .doc(user?.uid)
                        .set({
                            watchlist: {
                                ...value.watchlist,
                                movies: [
                                    ...prevWatchlistState?.watchlist.movies,
                                ],
                                tvShows: [...filteredData],
                            },
                        });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onTitleClick = (data: any) => {
        history.push({
            pathname: '/details',
            state: data,
        });
    };

    return (
        <article className="relative w-48 h-72 flex flex-col items-center mt-7 rounded-lg overflow-hidden">
            {user && (
                <Checkbox
                    uncheckedIcon="fas fa-plus"
                    checkedIcon="fas fa-check"
                    onAddToWatchlist={onAddToWatchlist}
                    isOnWatchlist={dataExists}
                />
            )}
            <img
                className="h-full object-cover overflow-hidden"
                src={
                    data?.poster_path
                        ? `${process.env.REACT_APP_TMDB_IMAGES_URL}${data?.poster_path}`
                        : noImagePlaceholder
                }
                alt="poster-image"
            />
            <div
                className="absolute flex items-center justify-center bottom-0 w-full bg-yellow-500 p-2 opacity-0 transition-opacity duration-300 hover:opacity-95 cursor-pointer"
                onClick={() => onTitleClick(data)}
            >
                <p className="text-white text-center">
                    {data?.title || data?.name}
                </p>
            </div>
        </article>
    );
};

export default Poster;
