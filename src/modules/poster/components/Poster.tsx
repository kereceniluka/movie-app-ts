import { FC, useContext } from 'react';
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

    return (
        <article className="relative w-48 h-72 flex flex-col items-center mt-7">
            {user && (
                <Checkbox
                    uncheckedIcon="fas fa-plus"
                    checkedIcon="fas fa-check"
                    onAddToWatchlist={onAddToWatchlist}
                    isOnWatchlist={dataExists}
                />
            )}
            <img
                className="rounded-lg object-cover overflow-hidden"
                src={
                    data?.poster_path
                        ? `${process.env.REACT_APP_TMDB_IMAGES_URL}${data?.poster_path}`
                        : noImagePlaceholder
                }
                alt="poster-image"
            />
        </article>
    );
};

export default Poster;
