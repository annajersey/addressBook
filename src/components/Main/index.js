import React from "react";
import "./main.scss";
import {connect} from "react-redux";
import {addPerson, deletePerson} from "../../store/actions";

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state={
			person: props.current,
			error: ''
		}
	}
	
	componentDidUpdate(prevProps){
		if (prevProps.current.id!=this.props.current.id) {
			this.setState({person: {...this.props.current}})
		}
	}
	
	Save(){
		if(!this.state.person.name || !this.state.person.lastname) {
			this.setState({error: "Please fill in all fields"})
		}
		else {
			this.setState({error: ""})
			this.props.addPerson(this.state.person)
		}
	}
	Delete(){
		this.setState({error: ""})
		this.props.deletePerson()
	}
	render() {
		return (
			<section>
				<input value={this.state.person.name} name="name"
				       onChange={(e) => this.setState({person: {...this.state.person,name: e.target.value}})}/>
				<input value={this.state.person.lastname} name="lastname"
				       onChange={(e) => this.setState({person: {...this.state.person,lastname: e.target.value}})}/>
				<button onClick={() => this.Save()}>Save</button>
				<button onClick={() => this.Delete()}>Delete</button>
				{this.state.error}
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {current: state.current};
};
export default connect(mapStateToProps, {addPerson,deletePerson})(Main);