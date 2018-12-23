import React from "react";
import "./main.scss";
import {connect} from "react-redux";
import {addPerson, deletePerson} from "../../store/actions";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			person: props.current,
			error: ''
		}
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps.current.id != this.props.current.id) {
			this.setState({person: {...this.props.current}})
		}
	}
	
	Save(e) {
		e.preventDefault();
		if (!this.state.person.name || !this.state.person.lastname) {
			this.setState({error: "Please fill in all fields"})
		} else {
			this.setState({error: ""})
			this.props.addPerson(this.state.person)
		}
	}
	
	Delete(e) {
		e.preventDefault();
		if(confirm("Delete this contact?")) {
			this.setState({error: ""})
			this.props.deletePerson()
		}
	}
	
	render() {
		return (
			<section>
				<form>
				<div className="formGroup">
					<label htmlFor="firstname">First name</label>
					<input autoComplete="off" id="firstname" value={this.state.person.name} name="name"
					       onChange={(e) => this.setState({person: {...this.state.person, name: e.target.value}})}/>
				</div>
				<div className="formGroup"><label htmlFor="lastname">Last name</label>
					<input autoComplete="off" value={this.state.person.lastname} name="lastname"
					       onChange={(e) => this.setState({person: {...this.state.person, lastname: e.target.value}})}/>
				</div>
				<div className="formGroup">
					{this.props.current.id>=1&&<button onClick={(e) => this.Delete(e)}>Delete</button>}
					<button className="save" onClick={(e) => this.Save(e)}>Save</button>
				</div>
				<div className="errorText">{this.state.error}</div>
				</form>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {current: state.current};
};
export default connect(mapStateToProps, {addPerson, deletePerson})(Main);