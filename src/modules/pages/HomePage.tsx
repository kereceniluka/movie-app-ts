import { FC } from 'react';

// assets
import logo from '../../assets/images/logo.svg';

// components
import Navigation from '../navigation/components/Navigation';
import Carousel from '../carousel/components/Carousel';
import Cta from '../cta/components/Cta';
import Search from '../search/components/Search';
import Footer from '../footer/components/Footer';

const HomePage: FC = () => {
    return (
        <>
            <Navigation logo={logo} />
            <Carousel />
            <Cta />
            {/* <Search /> */}
            <Footer />
        </>
    );
}

export default HomePage;
