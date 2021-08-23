import { FC, useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

// enums
import { ROUTES } from '@modules/navigation/enums/routes.enum';

// context
import { AuthContext } from '../context/AuthContext';

const PrivateRoute: FC<RouteProps> = ({ ...rest }) => {
    const user = useContext(AuthContext);

    if (!user) return <Redirect to={ROUTES.LOGIN} />;
    return <Route {...rest} />;
};

export default PrivateRoute;
