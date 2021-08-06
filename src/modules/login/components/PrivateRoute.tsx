import { ElementType, FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

// enums
import { ROUTES } from '@modules/navigation/enums/routes.enum';

// services
import { firebaseAuth } from '@core/services/firebase';

type IPrivateRoute = {
    path: RouteProps['path'];
    component: ElementType;
} & RouteProps;

const PrivateRoute: FC<IPrivateRoute> = ({ component: Component, ...rest }) => {

    const [user] = useAuthState(firebaseAuth);

    console.log(user);

    return (
        <Route {...rest} render={props => !user ? <Redirect to={ROUTES.LOGIN} /> : <Component {...props} />} />
    );
}

export default PrivateRoute;
