export const apiReplace = (id, start, end) =>
  `/api/todos/users/${id}/replace/start/${start}/end/${end}`;

export const apiAddTodo = (id) => `/api/todos/users/${id}`;

export const apiChangeTextTodo = (user, todo) =>
  `/api/todos/users/${user}/change/text/${todo}`;

export const apiChangeCompletedTodo = (user, todo) =>
  `/api/todos/users/${user}/change/completed/${todo}`;

export const apiGetTodos = (id) => `/api/todos/users/${id}`;

export const apiDeleteTodo = (user, todo) =>
  `/api/todos/users/${user}/delete/${todo}`;

export const apiRegisterUser = () => '/api/auth/register_login';
