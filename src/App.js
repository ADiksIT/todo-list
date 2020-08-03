import React from 'react';
import { Form } from "./components/Form";
import { List } from "./components/List";
import { NavBar } from "./components/NavBar";
import {ErrorBoundary} from "./utils/ErrorBoundary";

const App = () => {
  return (
    <main>
      <ErrorBoundary>
        <NavBar/>
      <div className="container">
          <Form />
          <List />
      </div>
      </ErrorBoundary>
    </main>
  );
}

export default App;
