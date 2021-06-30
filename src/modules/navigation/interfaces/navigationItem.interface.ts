import { ComponentType } from 'react';
import { ROUTES } from '../enums/routes.enum';

export interface INavigationItem {
    id: number;
    path: ROUTES;
    label?: string;
    isButton?: boolean;
    //contentComponent: ComponentType<any>;
}