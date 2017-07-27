import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => {
	return (
		<ul>
			{todos.map(todo =>
				<Todo key={todo.id}
					onClick={() => onTodoClick(todo.id)}
					completed={todo.completed}
					text={todo.text}/>
			)}
		</ul>
	)
};

export default TodoList;