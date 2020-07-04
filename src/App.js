import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Movie from './components/Movie';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/:id' component={Movie} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
