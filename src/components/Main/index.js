import React from "react";
import "./main.scss";
import {connect} from "react-redux";
import {addContact, deleteContact} from "../../store/actions";
import PropTypes from "prop-types";

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
            errorText: "",
            successText: ""
        };
    }
	
    componentDidUpdate(prevProps) {
        if (prevProps.current.id != this.props.current.id) { //TODO
            this.setState({contact: {...this.defaultContact, ...this.props.current}, errorText: "", successText:""});
        }
    }
	
    Save(e) {
        e.preventDefault();
        let successText, errorText, findDuplicate;
        if (this.props.current.id < 1) {
            findDuplicate = this.props.contacts.findIndex(
                c => c.firstName == this.state.contact.firstName && c.lastName == this.state.contact.lastName);
        }
        if (findDuplicate > -1&&this.props.current.id < 1){
            errorText = "The contact with this name already exists";
        }
        else if (!this.state.contact.firstName || !this.state.contact.lastName) {
            errorText = "Please fill in the first name and the last name";
        } else if (!(/^[0-9]*$/.test(this.state.contact.phone))) {
            errorText = "Phone field can contain numbers only";
        } else {
            successText = "Contact was saved";
            this.props.addContact(this.state.contact);
        }
        this.setState({errorText, successText});
    }
	
    Delete(e) {
        e.preventDefault();
        if (confirm("Delete this contact?")) {
            this.setState({errorText: "",successText:""});
            this.props.deleteContact();
        }
    }
	
    render() {
        const isNewContact = this.props.current.id < 1;
        return (
            <section>
                <form>
                    <h2>{isNewContact ? "Add New Contact" : "Edit Contact"}</h2>
                    <div className="formGroup">
                        <label htmlFor="firstName">First name</label>
                        <input autoComplete="off" type="text" value={this.state.contact.firstName || ""} name="firstName"
						       onChange={(e) => this.setState({
							       contact: {
								       ...this.state.contact,
								       firstName: e.target.value
							       }
						       })}/>
                    </div>
                    <div className="formGroup"><label htmlFor="lastName">Last name</label>
                        <input autoComplete="off" value={this.state.contact.lastName || ""} type="text" name="lastName"
						       onChange={(e) => this.setState({
							       contact: {
								       ...this.state.contact,
								       lastName: e.target.value
							       }
						       })}/>
                    </div>
                    <div className="formGroup"><label htmlFor="phone">Phone</label>
                            <input autoComplete="off" value={this.state.contact.phone || ""} type="tel" name="phone"
                                   onChange={(e) => this.setState({
                                       contact: {
                                           ...this.state.contact,
                                           phone: e.target.value
                                       }
                                   })}
                            />
                    </div>
                    <div className="formGroup"><label htmlFor="address">Address</label>
                        <input autoComplete="off" value={this.state.contact.address || ""} type="text" name="address"
                               onChange={(e) => this.setState({
                                   contact: {
                                       ...this.state.contact,
                                       address: e.target.value
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
    const {contacts, current} = state;
    return {contacts, current};
};
export default connect(mapStateToProps, {addContact, deleteContact})(Main);