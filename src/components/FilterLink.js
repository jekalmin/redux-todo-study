import { connect } from 'react-redux';
import Link from './Link';
import { setVisibilityFilter } from '../actions/index';

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

export default FilterLink;