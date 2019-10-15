import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListNotes from './components/ListNotes';
import EditNote from './components/EditNote';
import AddNote from './components/AddNote';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={ListNotes} />
        <Route path='/edit/:id' component={EditNote} />
        <Route path='/add' component={AddNote} />
      </Switch>
    </div>
  );
}

export default App;
