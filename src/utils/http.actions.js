const API_URL = 'https://todo1111112.herokuapp.com';

export const apiReplace = (id, start, end) =>
  `${API_URL}/api/todos/users/${id}/replace/start/${start}/end/${end}`;

export const apiAddTodo = (id) => `${API_URL}/api/todos/users/${id}`;

export const apiChangeTextTodo = (user, todo) =>
  `${API_URL}/api/todos/users/${user}/change/text/${todo}`;

export const apiChangeCompletedTodo = (user, todo) =>
  `${API_URL}/api/todos/users/${user}/change/completed/${todo}`;

export const apiGetTodos = (id) => `${API_URL}/api/todos/users/${id}`;

export const apiDeleteTodo = (user, todo) =>
  `${API_URL}/api/todos/users/${user}/delete/${todo}`;

export const apiRegisterUser = () => `${API_URL}/api/auth/register_login`;

export const apiAddAllTodos = (id) => `${API_URL}/api/todos/users/${id}/add_all`;
