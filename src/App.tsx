import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// enums
import { ROUTES } from '@modules/navigation/enums/routes.enum';

// modules
import HomePage from './modules/pages/HomePage';
import LoginPage from '@modules/login/pages/LoginPage';
import RegisterPage from '@modules/register/pages/RegisterPage';
import PrivateRoute from '@modules/login/components/PrivateRoute';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.DEFAULT} component={HomePage} />
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <PrivateRoute path={ROUTES.REGISTER} component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default App;
