import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

let nextId = 0;

const todo = (state = {}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return { id : nextId++, text : action.text, completed : false };
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

const store = createStore(todoApp);

store.dispatch({type:'ADD_TODO', text: 'aaa'});
store.dispatch({type:'ADD_TODO', text: 'aaa'});
// store.dispatch({type:'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED'});

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

const Link = ({active, children, onClick}) => {

	if (active) {
		return <span>{children}</span>;
	}

	return (
		<a href="#" onClick={(e) => {e.preventDefault(); onClick()}}>{children}</a>
	);
};

class FilterLink extends Component {

	componentDidMount() {
		this.unsubscribe = store.subscribe(() => this.forceUpdate() );
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const { filter, children } = this.props;
		return (
			<Link onClick={() => { store.dispatch({type:'SET_VISIBILITY_FILTER', filter: filter});}}
				active={ store.getState().visibilityFilter === filter }>
				{children}
			</Link>
		);
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

const AddTodo = ({ onAddClick }) => {
	return (
		<div>
			<input type="text" ref={ (node) => this.input = node}/>
			<button onClick={ () => {
				onAddClick(this.input.value);
				this.input.value='';
			}}>등록</button>
		</div>
	);
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

class TodoApp extends Component {

	render() {
		const {todos, visibilityFilter} = store.getState();
		const visibleTodos = getVisibleTodos(todos, visibilityFilter);
		return (
			<div>
				<AddTodo onAddClick={ text => store.dispatch({type: 'ADD_TODO', text: text})}/>
				<TodoList todos={visibleTodos} onTodoClick={(id) => store.dispatch({ type:'TOGGLE_TODO', id: id })}/>
				<Footer />
			</div>
		)
	}
}

const render = () => {
	console.log(store.getState());
	ReactDOM.render(
		<TodoApp />,
		document.getElementById('root')
	)
};

render();


// state = todos(state,{type:'ADD_TODO', text: 'bbb'});
// console.log(state)
// state = todos(state,{type:'TOGGLE_TODO', id: 1});
// console.log(state)