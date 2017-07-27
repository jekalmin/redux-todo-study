import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions/index';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers';

const mapStateToTodoProps = (state, { match }) => ({
	todos : getVisibleTodos(state, match.params.filter)
});

const VisibleTodoList = withRouter(connect(
	mapStateToTodoProps,
	{ onTodoClick : toggleTodo }
)(TodoList));

export default VisibleTodoList;