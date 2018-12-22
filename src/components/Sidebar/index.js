import React from "react";
import "./sidebar.scss";
import {connect} from "react-redux";
import {setCurrent} from "../../store/actions";

class Sidebar extends React.Component {
	render() {
		console.log(this.props.items)
		return (
			<aside>
				<button onClick={()=>this.props.setCurrent(null)}>Add New</button>
				<ul>
					{this.props.items.map(p =>
						<li key={p.id} onClick={()=>this.props.setCurrent(p)}>{p.name + ' ' + p.lastname}</li>)
					}
				</ul>
			</aside>
		);
	}
}

const mapStateToProps = (state) => {
	return {items: state.addressBookItems};
};
export default connect(mapStateToProps,{setCurrent})(Sidebar);