import { FC } from 'react';

// assets
import logo from '../../assets/images/logo.svg';

// components
import Navigation from '../navigation/components/Navigation';
import Carousel from '../carousel/components/Carousel';

const HomePage: FC = () => {
    return (
        <>
            <Navigation logo={logo} />
            <Carousel />
        </>
    );
}

export default HomePage;
