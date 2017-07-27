import { connect } from 'react-redux';
import TodoList from './TodoList';
import {toggleTodo} from '../actions/index';

const getVisibleTodos = (todos, filter) => {
	switch(filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed);
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed);
		default:
			throw new Error('unexpected filter!! ' + filter);
	}
};

const mapStateToTodoProps = (state) => {
	return {
		todos : getVisibleTodos(state.todos, state.visibilityFilter)
	};
};

const mapDispatchToTodoProps = (dispatch) => {
	return {
		onTodoClick : id => dispatch(toggleTodo(id))
	}
};

const VisibleTodoList = connect(
	mapStateToTodoProps,
	mapDispatchToTodoProps
)(TodoList);

export default VisibleTodoList;