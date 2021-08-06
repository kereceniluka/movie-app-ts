import { ROUTES } from '../enums/routes.enum';

export interface INavigationItem {
    id: number;
    path: ROUTES;
    label?: string;
    isButton?: boolean;
    needAuth?: boolean;
}