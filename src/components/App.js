import { Switch, Route, Redirect } from 'react-router-dom';
import './../styles/App.css';
import LinkList from './LinkList';
import Notification from './Notification';
import SignUp from './SignUp';

function App() {
  return (

    <Switch>
      <Route exact path="/" render={() => <>
        <LinkList />
        <Notification />
      </>} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  );
}

export default App;
