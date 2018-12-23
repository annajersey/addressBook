import React from "react";
import "./sidebar.scss";
import {connect} from "react-redux";
import {setCurrent} from "../../store/actions";

class Sidebar extends React.Component {
	constructor(props){
		super(props);
		this.state={
			items: props.items
		}
	}
	
	componentDidUpdate(prevProps){
		if (prevProps.items.length!=this.props.items.length) {
			this.setState({items: this.props.items})
		}
	}
	
	filterItems(e){
		let value = e.target.value;
		let items = [...this.props.items]
		items = items.filter(i=>
			i.name.toLowerCase().indexOf(value.toLowerCase())==0||
			i.lastname.toLowerCase().indexOf(value.toLowerCase())==0
		)
		console.log(value,items)
		this.setState({items});
	}
	render() {
		console.log(this.props.items)
		return (
			<aside>
				<button onClick={()=>this.props.setCurrent(null)}>Add New</button>
				<input type="text" onChange={(e)=>this.filterItems(e)}/>
				<ul>
					{this.state.items.map(p =>
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