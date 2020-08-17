export const apiReplace = (id, start, end) =>
  `https://todo1111112.herokuapp.com/api/todos/users/${id}/replace/start/${start}/end/${end}`;

export const apiAddTodo = (id) => `https://todo1111112.herokuapp.com/api/todos/users/${id}`;

export const apiChangeTextTodo = (user, todo) =>
  `https://todo1111112.herokuapp.com/api/todos/users/${user}/change/text/${todo}`;

export const apiChangeCompletedTodo = (user, todo) =>
  `https://todo1111112.herokuapp.com/api/todos/users/${user}/change/completed/${todo}`;

export const apiGetTodos = (id) => `https://todo1111112.herokuapp.com/api/todos/users/${id}`;

export const apiDeleteTodo = (user, todo) =>
  `https://todo1111112.herokuapp.com/api/todos/users/${user}/delete/${todo}`;

export const apiRegisterUser = () => 'https://todo1111112.herokuapp.com/api/auth/register_login';
