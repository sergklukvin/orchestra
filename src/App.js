import React from 'react';
import HeaderCard from './components/Header/HeaderCard';
import ListBooks from './components/Books/ListBooks';
import Container from '@material-ui/core/Container';
import AddNewBook from './components/AddUpdateBooks/AddUpdateBook';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Container maxWidth='md'>
      <HeaderCard />
      <Router>
        <Switch>
          <Route exact path='/' component={ListBooks} />
          <Route path='/add' component={AddNewBook} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
