import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// assets
import noImagePlaceholder from '@assets/images/no-image-placeholder.svg';

// interfaces
import { IPoster } from '../interfaces/poster.interface';

// components
import Checkbox from '@core/components/shared/Checkbox';
import TrailerButton from '@core/components/shared/TrailerButton';

// services
import { firebaseAuth } from '@core/services/firebase';

const Poster: FC<IPoster> = ({ img, mediaType, title }) => {

    const [user] = useAuthState(firebaseAuth);

    const onAddToWatchlist = async () => {
        
    }

    return (
        <article className="relative flex flex-col items-center mt-7">
            {user && <Checkbox uncheckedIcon="fas fa-plus" checkedIcon="fas fa-check" onAddToWatchlist={onAddToWatchlist} />}
            <img className="w-48 h-72 rounded-lg object-cover overflow-hidden" src={img ? `${process.env.REACT_APP_TMDB_IMAGES_URL}${img}` : noImagePlaceholder} alt="poster-image" />
            {mediaType === 'movie' && <TrailerButton icon="fas fa-play" label="Watch trailer" position="left" title={title} />}
        </article>
    );
}

export default Poster;
