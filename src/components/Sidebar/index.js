import React from "react";
import "./sidebar.scss";
import {connect} from "react-redux";
import _isEqual from "lodash.isequal";
import PropTypes from "prop-types";
import {setCurrent} from "../../store/actions";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: props.contacts,
            filterKey: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (!_isEqual(prevProps.contacts, this.props.contacts)) {
            this.setContactsListWithFilter();
        }
    }

    setContactsListWithFilter() {
        const contacts = this.props.contacts;
        const filterKey = this.state.filterKey;
        if (!filterKey) {
            this.setState({contacts});
        }
        const filteredContacts = contacts.filter(i =>
            (i.firstName + " " + i.lastName).toLowerCase().indexOf(filterKey.toLowerCase()) == 0
            || (i.lastName + " " + i.firstName).toLowerCase().indexOf(filterKey.toLowerCase()) == 0
        );
        this.setState({contacts: filteredContacts});
    }

    filterItems(e) {
        this.setState({filterKey: e.target.value}, () => {
            this.setContactsListWithFilter();
        });
    }

    sortContacts(contacts) {
        contacts.sort((a, b) =>
            a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())
        );
        return contacts;
    }

    render() {
        const contacts = this.sortContacts(this.state.contacts);
        return (
            <aside>
                <header><h1>Address Book</h1>
                    <button className="addButton" onClick={() => this.props.setCurrent(null)}>&#43;</button>
                </header>
                <input className="filterField" placeholder="Filter contacts" type="text"
                    onChange={(e) => this.filterItems(e)}/>
                <ul>
                    {contacts.map(p =>
                        <li className={this.props.current.id == p.id ? "selected" : null}
                            key={p.id} onClick={() => this.props.setCurrent(p)}>
                            {p.lastName + " " + p.firstName}
                        </li>)
                    }
                </ul>
            </aside>
        );
    }
}

Sidebar.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        phone: PropTypes.string,
        address: PropTypes.string
    })),
    current: PropTypes.object,
    setCurrent: PropTypes.func
};

const mapStateToProps = (state) => {
    return {contacts: state.contacts, current: state.current};
};
export default connect(mapStateToProps, {setCurrent})(Sidebar);