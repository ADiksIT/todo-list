import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import Loadable from "react-loadable";
import {useDispatch, useSelector} from 'react-redux';
import {addAllTodo} from './redux/actions/todos';
import {useHttp} from './hooks/http.hook';
import {handleDragEnd} from "./utils/onDragEnd";
import {apiAddAllTodos, apiReplace} from './utils/http.actions';
import {ErrorBoundary} from './utils/ErrorBoundary';
import {userStatus} from "./redux/actions/user";
import {NavBar} from './components/NavBar';
import {Loader} from "./components/Loader";

const languageList = ['ru', 'en'];

const App = () => {
  const {list, user} = useSelector(state => state);
  const dispatch = useDispatch();

  const {request} = useHttp();

  const onDragEnd = ({destination, source}) => {
    if (!destination) return;
    const result = handleDragEnd({destination, source, list})

    dispatch(addAllTodo(result));
    if (user.auth) {
      request(apiReplace(user.id, destination.index, source.index));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user.status) {
        const response = await request(apiAddAllTodos(user.id), 'POST', {data: list});
        dispatch(addAllTodo(response));
        dispatch(userStatus());
      }
    };
    fetchData().catch(e => console.error(e))
  }, [user.status]);

  const TodoWorkSpace = Loadable({
    loader: () => import(/*webpackChunkName: "main-page"*/ './components/TodoWorkSpace'),
    loading() {
      return <Loader/>
    },
  });

  const Auth = Loadable({
    loader: () => import(/* webpackChunkName: "auth-page" */ './components/Auth'),

    loading() {
      return <Loader/>
    },
  });

  const NotPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "not-found-page" */ './components/NotFound'),
    loading() {
      return <Loader/>
    },
  });


  return (

      <ErrorBoundary>
        <NavBar data={languageList}/>
        <div className='container'>
          <Switch>
            <Route path="/auth">
              <Auth/>
            </Route>
            <Route path='/list'>
              <TodoWorkSpace onDragEnd={onDragEnd}/>
            </Route>
            <Route component={NotPage}/>
          </Switch>
        </div>

      </ErrorBoundary>

  );
};

export default App;
