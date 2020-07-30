import React from 'react';
import { Form } from "./components/Form";
import { List } from "./components/List";
import { NavBar } from "./components/NavBar";

const App = () => {
  return (
    <main>
      <NavBar />
      <div className="container">
        <Form />
        <List />
      </div>
    </main>
  );
}

export default App;
