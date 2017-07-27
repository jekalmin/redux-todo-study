import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions/index';
import { withRouter } from 'react-router-dom';

const getVisibleTodos = (todos, filter) => {
	switch(filter) {
		case 'all':
			return todos;
		case 'active':
			return todos.filter(t => !t.completed);
		case 'completed':
			return todos.filter(t => t.completed);
		default:
			throw new Error('unexpected filter!! ' + filter);
	}
};

const mapStateToTodoProps = (state, { match }) => ({
	todos : getVisibleTodos(state.todos, match.params.filter)
});

const mapDispatchToTodoProps = (dispatch) => ({
	onTodoClick(id) {
		dispatch(toggleTodo(id));
	}
});

const VisibleTodoList = withRouter(connect(
	mapStateToTodoProps,
	mapDispatchToTodoProps
)(TodoList));

export default VisibleTodoList;