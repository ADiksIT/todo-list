import React from 'react';
import { Form } from "./components/Form";
import { List } from "./components/List";
import { NavBar } from "./components/NavBar";
import {ErrorBoundary} from "./utils/ErrorBoundary";
import {Modal} from "./components/Modal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {


  return (
      <Router>
        <main>
          <ErrorBoundary>
            <NavBar/>
            <div className="container">
              <Switch>
                <Route path="/auth">
                  <Modal />
                </Route>
                <Route path="/">
                  <Form />
                  <List />
                </Route>
              </Switch>
            </div>
          </ErrorBoundary>
        </main>
      </Router>
  );
}

export default App;
