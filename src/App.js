// 
import Navbar from './components/Navbar';
import Simulation from './components/Simulation';
import About from './components/About';
import Contributer from './components/Contributer';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css'
function App() {
  const routes = (
    <Switch>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/contributor" exact>
        <Contributer />
      </Route>
      <Route path="/simulation" exact>
        <Simulation />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <>

      <Router>
        <Navbar title="Simulation" about="About this project" team="Contributors" />
        <main>{routes}</main>
      </Router>
    </>
  );
}

export default App;
