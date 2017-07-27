import React from 'react';
import { addTodo } from '../actions/index';
import { connect } from 'react-redux';

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

export default AddTodo;