import React from "react";
import "./main.scss";
import {connect} from "react-redux";
import {addPerson, deletePerson} from "../../store/actions";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			person: props.current,
			errorText: '',
			successText: ''
		}
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps.current.id != this.props.current.id) {
			this.setState({person: {...this.props.current},errorText: '',successText: ''})
		}
	}
	
	Save(e) {
		e.preventDefault();
		if (!this.state.person.name || !this.state.person.lastname) {
			this.setState({errorText: "Please fill in all fields"})
		} else if (!(/^[0-9+]*$/.test(this.state.person.phone))) {
			this.setState({errorText: "Phone field can contain numbers only"})
		} else {
			this.setState({errorText: "", successText:"Contact was saved"})
			this.props.addPerson(this.state.person)
		}
	}
	
	Delete(e) {
		e.preventDefault();
		if (confirm("Delete this contact?")) {
			this.setState({errorText: ""})
			this.props.deletePerson()
		}
	}
	
	render() {
		let isNewContact = this.props.current.id < 1;
		return (
			<section>
				<form>
					<h2>{isNewContact ? "Add New Contact" : "Edit Contact"}</h2>
					<div className="formGroup">
						<label htmlFor="firstname">First name</label>
						<input autoComplete="off" id="firstname" value={this.state.person.name || ''} name="name"
						       onChange={(e) => this.setState({person: {...this.state.person, name: e.target.value}})}/>
					</div>
					<div className="formGroup"><label htmlFor="lastname">Last name</label>
						<input autoComplete="off" value={this.state.person.lastname || ''} name="lastname"
						       onChange={(e) => this.setState({
							       person: {
								       ...this.state.person,
								       lastname: e.target.value
							       }
						       })}/>
					</div>
					<div className="formGroup"><label htmlFor="phone">Phone</label>
						<input autoComplete="off" value={this.state.person.phone || ''} type="tel" name="phone"
						       onChange={(e) => this.setState({
							       person: {
								       ...this.state.person,
								       phone: e.target.value
							       }
						       })}
						/>
					</div>
					<div className="formGroup">
						{!isNewContact && <button onClick={(e) => this.Delete(e)}>Delete</button>}
						<button className="save" onClick={(e) => this.Save(e)}>Save</button>
					</div>
					<div className="notification">
						<span className="errorText">{this.state.errorText}</span>
						<span className="successText">{this.state.successText}</span>
					</div>
				</form>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {current: state.current};
};
export default connect(mapStateToProps, {addPerson, deletePerson})(Main);