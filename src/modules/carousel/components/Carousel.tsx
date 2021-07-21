import { FC } from 'react';
import './Carousel.scss';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import axios from 'axios';

// components
import Poster from '../../poster/components/Poster';

// interfaces
import { ITrendingMovie, IMovieGenre } from '@core/interfaces/movie.interface';
import api from '@core/services/api';

const Carousel: FC = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const fetchTrendingMovies = async () => {
        const res = await axios.all([
            api.get('/trending/movie/week'),
            api.get('/genre/movie/list'),
        ]);

        return res;
    }

    const { data, status, error } = useQuery<any>('trendingMovies', fetchTrendingMovies);

    const isMediumScreen = useMediaQuery({ minWidth: 768 });
    const isXLargeScreen = useMediaQuery({ minWidth: 1280 });

    const showMovieGenres = (genreIDs: number[]):string => {
        return data[1].data.genres
            .filter((genre: IMovieGenre) => genreIDs.includes(genre.id))
            .map(({ name }: { name: string }) => name)
            .join(' | ');
    }

    return (
        <Slider {...settings}>
            {status === 'success' && data[0].data.results.slice(0, 5).map((movie: ITrendingMovie) => (
                <section key={movie.id} className="carousel-slide h-60vh lg:h-full">
                    <article className="absolute bottom-10% lg:bottom-20% left-0 flex flex-wrap lg:px-24">
                        {isXLargeScreen && <h3 className="hidden lg:block w-full text-white text-2xl font-bold">Top 5 movies</h3>}
                        {isXLargeScreen && <Poster img={movie?.poster_path} mediaType="movie" title={movie.title} />}
                        <div className="text-white flex flex-col justify-center mx-8">
                            <span className="text-xl pb-3">{movie.release_date.substring(0, 4)}</span>
                            <h2 className="text-3xl lg:text-6xl font-bold pb-2">{movie.title}</h2>
                            <span className="text-base lg:text-xl pb-5">{movie.genre_ids && showMovieGenres(movie.genre_ids)}</span>
                            {isMediumScreen && <p className="max-w-3xl text-xl text-gray-300 pb-6">{movie.overview}</p>}
                            <span>
                                <i className="fas fa-star text-yellow-400 text-lg lg:text-xl"></i>
                                <span className="text-lg lg:text-xl font-bold px-3">{movie.vote_average.toFixed(1)}</span>
                            </span>
                        </div>
                    </article>
                    <img className="w-full h-60vh lg:h-80vh object-cover object-top" src={`${process.env.REACT_APP_TMDB_IMAGES_URL}${movie?.backdrop_path}`} alt="carousel-slide-bg" />
                </section>
            ))}
        </Slider>
    );
}

export default Carousel;
