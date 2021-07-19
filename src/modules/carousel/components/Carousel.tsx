import { FC } from 'react';
import './Carousel.scss';
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

    const showMovieGenres = (genreIDs: number[]):string => {
        return data[1].data.genres
            .filter((genre: IMovieGenre) => genreIDs.includes(genre.id))
            .map(({ name }: { name: string }) => name)
            .join(' | ');
    }

    return (
        <Slider {...settings}>
            {status === 'success' && data[0].data.results.slice(0, 5).map((movie: ITrendingMovie) => (
                <section key={movie.id} className="carousel-slide">
                    <article className="absolute bottom-20% left-0 flex flex-wrap px-24 ">
                        <h3 className="w-full text-white text-2xl font-bold">Top 5 movies</h3>
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
                    <img className="w-full h-80vh object-cover object-top" src={`${process.env.REACT_APP_TMDB_IMAGES_URL}${movie?.backdrop_path}`} alt="carousel-slide-bg" />
                </section>
            ))}
        </Slider>
    );
}

export default Carousel;
