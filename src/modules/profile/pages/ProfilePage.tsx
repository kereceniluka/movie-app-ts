import { FC } from 'react';

// assets
import logo from '@assets/images/logo.svg';

// components
import Watchlist from '../components/Watchlist';

// modules
import Navigation from '@modules/navigation/components/Navigation';

const ProfilePage: FC = () => {
    return (
        <div>
            <Navigation logo={logo} />
            <Watchlist />
        </div>
    );
};

export default ProfilePage;
