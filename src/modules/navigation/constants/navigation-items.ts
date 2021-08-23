import { ROUTES } from '../enums/routes.enum';

export const navigationItems = [
    {
        id: 1,
        path: ROUTES.LOGIN,
        label: 'Log In',
        isButton: false,
        needAuth: false,
    },
    {
        id: 2,
        path: ROUTES.REGISTER,
        label: 'Sign Up',
        isButton: true,
        needAuth: false,
    },
    {
        id: 3,
        path: ROUTES.PROFILE,
        label: 'Profile',
        isButton: false,
        needAuth: true,
    },
];