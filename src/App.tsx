import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// enums
import { ROUTES } from '@modules/navigation/enums/routes.enum';

// modules
import HomePage from './modules/pages/HomePage';
import LoginPage from '@modules/login/pages/LoginPage';
import RegisterPage from '@modules/register/pages/RegisterPage';
import ProfilePage from '@modules/profile/pages/ProfilePage';
import PrivateRoute from '@modules/auth/components/PrivateRoute';

const App: FC = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path={ROUTES.DEFAULT} component={HomePage} />
                    <Route path={ROUTES.LOGIN} component={LoginPage} />
                    <Route path={ROUTES.REGISTER} component={RegisterPage} />
                    <PrivateRoute
                        path={ROUTES.PROFILE}
                        component={ProfilePage}
                    />
                </Switch>
            </Router>
        </>
    );
};

export default App;
