import { ROUTES } from '../enums/routes.enum';

export interface INavigationItem {
    id: number;
    path: ROUTES;
    label: string | null;
    isButton?: boolean;
    needAuth?: boolean;
}
