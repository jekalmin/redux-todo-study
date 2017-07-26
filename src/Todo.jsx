import React, { Component } from 'react';
import * as Redux from 'redux';

class Todo extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <span>Todo : <input type="text" /></span>;
	}

}

export default Todo;