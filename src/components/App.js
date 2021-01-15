import { Switch, Route, Redirect } from 'react-router-dom';
import './../styles/App.css';

import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';

function App() {
  return (

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default App;
