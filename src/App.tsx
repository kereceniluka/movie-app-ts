import { BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from './modules/pages/HomePage';

const App = () => {
  return (
    <Router>
      <Switch>
        <HomePage />
      </Switch>
    </Router>
  );
}

export default App;
