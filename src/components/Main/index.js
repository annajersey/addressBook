import React from "react";
import "./main.scss";
import {connect} from "react-redux";
import {addContact, deleteContact} from "../../store/actions";
import PropTypes from "prop-types";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.defaultContact={
			firstName: '',
			lastName: '',
			phone: ''
		}
		this.state = {
			contact: {...this.defaultContact,...props.current},
			errorText: '',
			successText: ''
		}
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps.current.id != this.props.current.id) {
			this.setState({contact: {...this.defaultContact,...this.props.current},errorText: '',successText: ''})
		}
	}
	
	Save(e) {
		e.preventDefault();
		if (!this.state.contact.firstName || !this.state.contact.lastName) {
			this.setState({errorText: "Please fill in all fields"})
		} else if (!(/^[0-9]*$/.test(this.state.contact.phone))) {
			this.setState({errorText: "Phone field can contain numbers only"})
		} else {
			this.setState({errorText: "", successText:"Contact was saved"})
			this.props.addContact(this.state.contact)
		}
	}
	
	Delete(e) {
		e.preventDefault();
		if (confirm("Delete this contact?")) {
			this.setState({errorText: ""})
			this.props.deleteContact()
		}
	}
	
	render() {
		let isNewContact = this.props.current.id < 1;
		return (
			<section>
				<form>
					<h2>{isNewContact ? "Add New Contact" : "Edit Contact"}</h2>
					<div className="formGroup">
						<label htmlFor="firstName">First name</label>
						<input autoComplete="off" value={this.state.contact.firstName || ''} name="firstName"
						       onChange={(e) => this.setState({contact: {...this.state.contact, firstName: e.target.value}})}/>
					</div>
					<div className="formGroup"><label htmlFor="lastName">Last name</label>
						<input autoComplete="off" value={this.state.contact.lastName || ''} name="lastName"
						       onChange={(e) => this.setState({
							       contact: {
								       ...this.state.contact,
								       lastName: e.target.value
							       }
						       })}/>
					</div>
					<div className="formGroup"><label htmlFor="phone">Phone</label>
						<input autoComplete="off" value={this.state.contact.phone || ''} type="tel" name="phone"
						       onChange={(e) => this.setState({
							       contact: {
								       ...this.state.contact,
								       phone: e.target.value
							       }
						       })}
						/>
					</div>
					<div className="formGroup">
						{!isNewContact && <button onClick={(e) => this.Delete(e)}>Delete</button>}
						<button className="save" onClick={(e) => this.Save(e)}>Save</button>
					</div>
					<div className="formGroup notification">
						<span className="errorText">{this.state.errorText}</span>
						<span className="successText">{this.state.successText}</span>
					</div>
				</form>
			</section>
		);
	}
}

Main.propTypes = {
	current: PropTypes.object,
	addContact: PropTypes.func,
	deleteContact: PropTypes.func,
};

const mapStateToProps = (state) => {
	return {current: state.current};
};
export default connect(mapStateToProps, {addContact, deleteContact})(Main);