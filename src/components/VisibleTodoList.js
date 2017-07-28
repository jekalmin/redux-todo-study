import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions/index';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {

	componentDidMount() {
		fetchTodos(this.props.filter).then(todos => console.log(todos));
	}

	componentDidUpdate(prevProps) {
		if (this.props.filter !== prevProps.filter) {
			fetchTodos(this.props.filter).then(todos => console.log(todos));
		}
	}

	render() {
		return <TodoList {...this.props} />
	}
}

const mapStateToTodoProps = (state, { match }) => ({
	todos : getVisibleTodos(state, match.params.filter),
	filter : match.params.filter
});

VisibleTodoList = withRouter(connect(
	mapStateToTodoProps,
	{ onTodoClick : toggleTodo }
)(VisibleTodoList));

export default VisibleTodoList;