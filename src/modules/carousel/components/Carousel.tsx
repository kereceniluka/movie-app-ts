import { FC, useEffect, useState } from 'react';
import './Carousel.scss';
import Slider from 'react-slick';

// components
import Poster from '../../poster/components/Poster';

// hooks
import useFetch from '@core/hooks/useFetch';

// interfaces
import { ITrendingMovie, IMovieGenre } from '@core/interfaces/movie.interface';

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}

const Carousel: FC = () => {

    const { status, data: trendingMovies, error } = useFetch<any>('/trending/movie/week');
    const { data: genres } = useFetch<any>('/genre/movie/list');

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setMovies(trendingMovies?.results.slice(0, 5));
    }, [status]);

    const showMovieGenres = (genreIDs: number[]):string => {
        return genres.genres
            .filter((genre: IMovieGenre) => genreIDs.includes(genre.id))
            .map(({ name }: { name: string }) => name)
            .join(' | ');
    }

    return (
        <Slider {...settings}>
            {movies?.length && movies.map((movie: ITrendingMovie) => (
                <section key={movie.id} className="carousel-slide">
                    <article className="carousel-info flex px-24">
                        <h3 className="text-white text-2xl font-bold">Top 5 movies</h3>
                        <Poster img={movie?.poster_path} />
                        <div className="text-white flex flex-col justify-center mx-8">
                            <span className="text-xl pb-3">{movie.release_date.substring(0, 4)}</span>
                            <h2 className="text-6xl font-bold pb-2">{movie.title}</h2>
                            <span className="text-xl pb-5">{movie.genre_ids && showMovieGenres(movie.genre_ids)}</span>
                            <p className="max-w-3xl text-xl text-gray-300 pb-6">{movie.overview}</p>
                            <span>
                                <i className="fas fa-star text-yellow-400 text-xl"></i>
                                <span className="text-xl font-bold px-3">{movie.vote_average.toFixed(1)}</span>
                            </span>
                        </div>
                    </article>
                    <img className="carousel-image" src={`${process.env.REACT_APP_TMDB_IMAGES_URL}${movie?.backdrop_path}`} alt="carousel-slide-bg" />
                </section>
            ))}
        </Slider>
    );
}

export default Carousel;
