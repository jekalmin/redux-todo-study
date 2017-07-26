import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux'
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

let nextId = 0;

/* action creators */
const addTodo = (text) => {
	return {
		type: 'ADD_TODO',
		id : nextId++,
		text: text
	};
};

const toggleTodo = (id) => {
	return {
		type:'TOGGLE_TODO',
		id: id
	};
};

const setVisibilityFilter = (filter) => {
	return {
		type:'SET_VISIBILITY_FILTER',
		filter: filter
	};
};
/* action creators end */

/* reducers */
const todo = (state = {}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return { id : action.id, text : action.text, completed : false };
		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
				return state;
			}

			return {
				...state,
				completed : !state.completed
			}
		default:
			return state;
	}
};

const todos = (state = [], action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return [...state, todo(undefined, action)];
		case 'TOGGLE_TODO':
			return state.map(t => todo(t, action));
		default:
			return state;
	}
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch(action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

const todoApp = combineReducers({
	todos,
	visibilityFilter
});

/* reducers end */

/* components */

let AddTodo = ({dispatch}) => {
	return (
		<div>
			<input type="text" ref={ (node) => this.input = node}/>
			<button onClick={ () => {
				dispatch(addTodo(this.input.value))
				this.input.value='';
			}}>Add Todo</button>
		</div>
	);
};
AddTodo = connect()(AddTodo);

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

const VisibleTodoList = connect(
	mapStateToTodoProps,
	mapDispatchToTodoProps
)(TodoList);

const getVisibleTodos = (todos, filter) => {
	switch(filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed);
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed);
	}
};

const Todo = ({text, completed, onClick}) => {
	return (
		<li onClick={onClick}
			style={{textDecoration : completed ? 'line-through' : 'none' }}>
			{text}
		</li>
	)
};


const Footer = () => {
	return (
		<p>
			<FilterLink filter='SHOW_ALL'>All</FilterLink> { " " }
			<FilterLink filter='SHOW_ACTIVE'>Active</FilterLink> { " " }
			<FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink> { " " }
		</p>
	);
};

const Link = ({active, children, onClick}) => {

	if (active) {
		return <span>{children}</span>;
	}

	return (
		<a href="#" onClick={(e) => {e.preventDefault(); onClick()}}>{children}</a>
	);
};

const mapStateToLinkProps = (state, ownProps) => {
	return {
		active : state.visibilityFilter === ownProps.filter
	};
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return {
		onClick : () => {
			dispatch(setVisibilityFilter(ownProps.filter));
		}
	}
};

const FilterLink = connect(
	mapStateToLinkProps,
	mapDispatchToLinkProps
)(Link);

const TodoApp = () => {
	return (
		<div>
			<AddTodo />
			<VisibleTodoList />
			<Footer />
		</div>
	)
}

/* components end */

ReactDOM.render(
	<Provider store={createStore(todoApp)}>
		<TodoApp />
	</Provider>,
	document.getElementById('root')
)

