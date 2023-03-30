import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store/store';
import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import Registro from './componentes/Registro';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route path="/registro" component={Registro}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
    </Switch>
    </Router>
    </Provider>
  );
}

export default App;