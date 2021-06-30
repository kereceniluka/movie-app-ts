import './Poster.scss';

// assets
import noImagePlaceholder from '../../../assets/images/no-image-placeholder.svg';

// interfaces
import { IPoster } from '../interfaces/poster.interface';

// components
import Checkbox from '@core/components/shared/Checkbox';
import TrailerButton from '@core/components/shared/TrailerButton';

const Poster = (props: IPoster) => {
    return (
        <div className="poster-card">
            <Checkbox />
            <img className="poster-card-image" src={props?.img ? `${process.env.REACT_APP_TMDB_IMAGES_URL}${props?.img}` : noImagePlaceholder} alt="poster-image" />
            <TrailerButton icon="fas fa-play" label="Watch trailer" position="left" />
        </div>
    );
}

export default Poster;
