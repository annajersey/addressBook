import React from "react";
import "./main.scss";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addContact, deleteContact} from "../../store/actions";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.defaultContact = {
			firstName: "",
			lastName: "",
			phone: "",
			address: ""
		};
		this.state = {
			contact: {...this.defaultContact, ...props.current},
			errorText: ""
		};
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps.current.id != this.props.current.id) { //TODO
			this.setState({contact: {...this.defaultContact, ...this.props.current}, errorText: ""});
		}
	}
	
	Save(e) {
		e.preventDefault();
		let errorText, findDuplicate;
		if (this.props.current.id < 1) {
			findDuplicate = this.props.contacts.findIndex(
				c => c.firstName == this.state.contact.firstName && c.lastName == this.state.contact.lastName);
		}
		if (findDuplicate > -1 && this.props.current.id < 1) {
			errorText = "The contact with this name already exists";
		} else if (!this.state.contact.firstName || !this.state.contact.lastName) {
			errorText = "Please fill in the first name and the last name";
		} else if (!(/^[0-9]*$/.test(this.state.contact.phone))) {
			errorText = "Phone field can contain numbers only";
		} else {
			this.props.addContact(this.state.contact);
		}
		this.setState({errorText});
	}
	
	Delete(e) {
		e.preventDefault();
		if (confirm("Delete this contact?")) {
			this.setState({errorText: ""});
			this.props.deleteContact();
		}
	}
	
	fieldOnChange(e, field) {
		this.setState({
			contact: {
				...this.state.contact,
				[field]: e.target.value
			}
		})
	}
	
	render() {
		const isNewContact = this.props.current.id < 1;
		return (
			<section>
				<form>
					<h2>{isNewContact ? "Add New Contact" : "Edit Contact"}</h2>
					<div className="formGroup">
						<label htmlFor="firstName">First name</label>
						<input autoComplete="off" type="text" value={this.state.contact.firstName || ""}
							   name="firstName"
							   onChange={(e) => this.fieldOnChange(e, 'firstName')}/>
					</div>
					<div className="formGroup"><label htmlFor="lastName">Last name</label>
						<input autoComplete="off" value={this.state.contact.lastName || ""} type="text" name="lastName"
							   onChange={(e) => this.fieldOnChange(e, 'lastName')}/>
					</div>
					<div className="formGroup"><label htmlFor="phone">Phone</label>
						<input autoComplete="off" value={this.state.contact.phone || ""} type="tel" name="phone"
							   onChange={(e) => this.fieldOnChange(e, 'phone')}
						/>
					</div>
					<div className="formGroup"><label htmlFor="address">Address</label>
						<input autoComplete="off" value={this.state.contact.address || ""} type="text" name="address"
							   onChange={(e) => this.fieldOnChange(e, 'address')}
						/>
					</div>
					<div className="formGroup">
						{!isNewContact && <button onClick={(e) => this.Delete(e)}>Delete</button>}
						<button className="save" onClick={(e) => this.Save(e)}>Save</button>
					</div>
					<div className="formGroup notification">
						<span className="errorText">{this.state.errorText}</span>
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
	contacts: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		phone: PropTypes.string,
		address: PropTypes.string
	})),
};

const mapStateToProps = (state) => {
	const {contacts, current} = state;
	return {contacts, current};
};
export default connect(mapStateToProps, {addContact, deleteContact})(Main);