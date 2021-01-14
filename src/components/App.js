import { Switch, Route, Redirect } from 'react-router-dom';
import './../styles/App.css';
import LinkList from './LinkList';
import Notification from './Notification';
import SignUp from './SignUp';
import Login from './Login';

function App() {
  return (

    <Switch>
      <Route exact path="/" render={() => <>
        <LinkList />
        <Notification />
      </>} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default App;
