import React, { useEffect } from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAllTodo } from './redux/actions/todos';
import { Form } from './components/Form';
import { DragDropContext } from 'react-beautiful-dnd';
import { List } from './components/todo/List';
import { NavBar } from './components/NavBar';
import { Modal } from './components/Auth';
import { useHttp } from './hooks/http.hook';
import { handleDragEnd } from "./utils/onDragEnd";
import { apiAddAllTodos, apiReplace} from './utils/http.actions';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { userStatus} from "./redux/actions/user";


const App = () => {
  const { list, user } = useSelector(state => state);
  const dispatch = useDispatch();

  const { request } = useHttp();

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    const result = handleDragEnd({destination, source, list})

    dispatch(addAllTodo(result));

    if (user.auth) {
      request(apiReplace(user.id, destination.index, source.index));
    }
  };

  useEffect( () => {
    const fetchData = async () => {
      if (user.status) {
        const response = await request(apiAddAllTodos(user.id), 'POST', {data: list});
        dispatch(addAllTodo(response));
        dispatch(userStatus());
      }

    };
    fetchData().catch(e => console.error(e))
  }, [user.status]);


  return (
    <HashRouter basename='/'>
      <main>
        <ErrorBoundary>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Redirect to="/list" />
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
