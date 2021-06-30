import { ROUTES } from '../enums/routes.enum';

// pages
import HomePage from '../../pages/HomePage';

export const navigationItems = [
    {
        id: 1,
        path: ROUTES.LOGIN,
        label: 'Log In',
        //contentComponent: LoginPage,
        isButton: false,
    },
    {
        id: 2,
        path: ROUTES.REGISTER,
        label: 'Sign Up',
        //contentComponent: RegisterPage,
        isButton: true,
    },
];