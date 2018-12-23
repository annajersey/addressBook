import React from "react";
import "./sidebar.scss";
import {connect} from "react-redux";
import  _isEqual from 'lodash.isequal'
import {setCurrent} from "../../store/actions";

class Sidebar extends React.Component {
	constructor(props){
		super(props);
		this.state={
			contacts: props.contacts
		}
	}
	
	componentDidUpdate(prevProps){
		if (!_isEqual(prevProps.contacts,this.props.contacts)) {
			this.setState({contacts: this.props.contacts})
		}
	}
	
	filterItems(e){
		let value = e.target.value;
		let contacts = [...this.props.contacts]
		contacts = contacts.filter(i=>
			i.name.toLowerCase().indexOf(value.toLowerCase())==0||
			i.lastname.toLowerCase().indexOf(value.toLowerCase())==0
		)
		this.setState({contacts});
	}
	
	sortContacts(contacts){
		contacts.sort( (a, b) =>
			 a.name.toUpperCase().localeCompare(b.name.toUpperCase())
		);
		return contacts;
	}
	
	render() {
		let contacts = this.sortContacts(this.state.contacts)
		return (
			<aside>
				<header><h1>Address Book</h1>
					<button className="addButton" onClick={()=>this.props.setCurrent(null)}>&#43;</button>
				</header>
				<input className="filterField" placeholder="Filter contacts" type="text" onChange={(e)=>this.filterItems(e)}/>
				<ul>
					{contacts.map(p =>
						<li className={this.props.current.id==p.id?"selected":null} key={p.id} onClick={()=>this.props.setCurrent(p)}>
							{p.lastname + ' ' + p.name}
						</li>)
					}
				</ul>
			</aside>
		);
	}
}

const mapStateToProps = (state) => {
	return {contacts: state.contacts, current: state.current};
};
export default connect(mapStateToProps,{setCurrent})(Sidebar);