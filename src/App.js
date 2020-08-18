import React from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAllTodo } from './redux/actions/actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { Form } from './components/Form';
import { List } from './components/List';
import { NavBar } from './components/NavBar';
import { Modal } from './components/Auth';
import { useHttp } from './hooks/http.hook';
import { handleDragEnd } from "./utils/onDragEnd";
import { apiReplace } from './utils/http.actions';
import { ErrorBoundary } from './utils/ErrorBoundary';

const App = () => {
  const { list, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { request } = useHttp();

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const result = handleDragEnd({destination, source, list})

    dispatch(addAllTodo(result));
    request(apiReplace(user.id, destination.index, source.index));
  };

  return (
    <HashRouter basename='/'>
      <main>
        <ErrorBoundary>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Redirect to="/auth" />
              </Route>
              <Route path="/auth">
                <Modal />
              </Route>
              <Route path="/list">
                <Form />
                <DragDropContext onDragEnd={onDragEnd}>
                  <List />
                </DragDropContext>
              </Route>
            </Switch>
          </div>
        </ErrorBoundary>
      </main>
    </HashRouter>
  );
};

export default App;
