import { FC, useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

// core
import GridView from '@core/components/shared/GridView';
import { firebase, firebaseFirestore } from '@core/services/firebase';

// modules
import Poster from '../../poster/components/Poster';

const Watchlist: FC = () => {
    const user = useContext(AuthContext);
    const [watchlist, setWatchlist] =
        useState<firebase.firestore.DocumentData | undefined>(undefined);

    useEffect(() => {
        firebaseFirestore
            .collection('users')
            .doc(user?.uid)
            .onSnapshot(doc => {
                const watchlist = doc.data();
                setWatchlist(watchlist?.watchlist);
            });
    }, []);

    return (
        <section className="mx-10">
            <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left mt-8 mb-4 md:mt-14 md:mx-8 lg:mx-12 lg:my-12 py-5 border-b-2 border-gray-100">
                Watchlist
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-600 my-2 md:my-6 lg:my-10 md:mx-4 lg:mx-10">
                Movies
            </h2>
            <GridView>
                {watchlist?.movies.map((movie: any) => (
                    <Poster
                        key={movie.id}
                        mediaType="movie"
                        isOnWatchlist
                        data={movie}
                    />
                ))}
            </GridView>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-600 my-2 md:my-6 lg:my-10 md:mx-4 lg:mx-10">
                Tv Shows
            </h2>
            <GridView>
                {watchlist?.tvShows.map((tvShow: any) => (
                    <Poster key={tvShow.id} data={tvShow} />
                ))}
            </GridView>
        </section>
    );
};

export default Watchlist;
