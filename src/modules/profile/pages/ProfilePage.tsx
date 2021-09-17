import { FC } from 'react';

// assets
import logo from '@assets/images/logo.svg';

// components
import Watchlist from '../components/Watchlist';

// modules
import Navigation from '@modules/navigation/components/Navigation';
import Footer from '@modules/footer/components/Footer';

const ProfilePage: FC = () => {
    return (
        <div>
            <Navigation logo={logo} />
            <Watchlist />
            <Footer />
        </div>
    );
};

export default ProfilePage;
