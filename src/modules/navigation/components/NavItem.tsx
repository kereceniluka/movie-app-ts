import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './NavItem.scss';

// interfaces
import { INavigationItem } from '../interfaces/navigationItem.interface';

const NavItem: FC<INavigationItem> = ({ id, path, label, isButton }) => (
    <NavLink
        key={id}
        to={path}
        className={classNames('nav-item', { 'nav-btn': isButton })}
    >
        {label}
    </NavLink>
);

export default NavItem;
