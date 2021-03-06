import { FC, MouseEventHandler, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavItem.scss';
import { AuthContext } from '@modules/auth/context/AuthContext';

// enums
import { ROUTES } from '../enums/routes.enum';

// constants
import { navigationItems } from '../constants/navigation-items';

// interfaces
import { INavigation } from '../interfaces/navigation.interface';

// components
import NavItem from './NavItem';

// services
import { firebaseAuth } from '@core/services/firebase';

const Navigation: FC<INavigation> = ({ logo }) => {
    const [isClicked, setIsClicked] = useState(false);

    const user = useContext(AuthContext);

    const toggleMenu: MouseEventHandler<HTMLElement> = () => {
        setIsClicked(prevState => !prevState);
    };

    const logout: MouseEventHandler<HTMLElement> = () => {
        firebaseAuth.signOut();
    };

    return (
        <header>
            <nav className="h-20 flex items-center justify-between bg-white px-6 shadow lg:px-24">
                <NavLink to={ROUTES.DEFAULT}>
                    <img
                        src={logo}
                        alt="logo"
                        className="w-36 lg:w-40 xl:w-44"
                    />
                </NavLink>
                <div className="hidden md:block">
                    {!user ? (
                        navigationItems
                            .filter(navItem => !navItem.needAuth)
                            .map(({ id, path, label, isButton }) => (
                                <NavItem
                                    key={id}
                                    id={id}
                                    path={path}
                                    label={label}
                                    isButton={isButton}
                                />
                            ))
                    ) : (
                        <>
                            {navigationItems
                                .filter(navItem => navItem.needAuth)
                                .map(({ id, path, label, isButton }) =>
                                    path === '/profile' ? (
                                        <NavItem
                                            key={id}
                                            id={id}
                                            path={path}
                                            label={user?.displayName}
                                            isButton={isButton}
                                        />
                                    ) : (
                                        <NavItem
                                            key={id}
                                            id={id}
                                            path={path}
                                            label={label}
                                            isButton={isButton}
                                        />
                                    )
                                )}
                            <button className="nav-btn" onClick={logout}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
                <i
                    className={`fas ${
                        isClicked ? 'fa-times' : 'fa-bars'
                    } fa-lg md:hidden`}
                    onClick={toggleMenu}
                />
            </nav>
            <div
                className={`${
                    isClicked ? 'block' : 'hidden'
                } h-80 flex flex-col items-center justify-center bg-gray-100`}
            >
                {!user ? (
                    navigationItems
                        .filter(navItem => !navItem.needAuth)
                        .map(({ id, path, label, isButton }) => (
                            <NavItem
                                key={id}
                                id={id}
                                path={path}
                                label={label}
                                isButton={isButton}
                            />
                        ))
                ) : (
                    <>
                        {navigationItems
                            .filter(navItem => navItem.needAuth)
                            .map(({ id, path, label, isButton }) =>
                                path === '/profile' ? (
                                    <NavItem
                                        key={id}
                                        id={id}
                                        path={path}
                                        label={user?.displayName}
                                        isButton={isButton}
                                    />
                                ) : (
                                    <NavItem
                                        key={id}
                                        id={id}
                                        path={path}
                                        label={label}
                                        isButton={isButton}
                                    />
                                )
                            )}
                        <button className="nav-btn" onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navigation;
