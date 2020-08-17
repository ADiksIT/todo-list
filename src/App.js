import React from 'react';
import { Form } from './components/Form';
import { List } from './components/List';
import { NavBar } from './components/NavBar';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { Modal } from './components/Modal';
import {Switch, Route, HashRouter} from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addAllTodo } from './redux/actions/actions';
import { useHttp } from './hooks/http.hook';
import { apiReplace } from './http.actions';

const App = () => {
  const { list, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { request } = useHttp();

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const result = Array.from(list);
    const [removed] = result.splice(source.index, 1);
    result.splice(destination.index, 0, removed);

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
              <Route path="/auth">
                <Modal />
              </Route>
              <Route path="/">
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
