import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT} from "../constants";

const getNextId = (contacts) => {
	return Math.max(...contacts.map(p => p.id), 0) + 1
}
const createNewItem = () => {
	return {id: parseFloat(Math.random().toFixed(3)), firstName: '', lastName: '', phone: ''}
}
const initialState = {
	contacts: [
		{id: 1, firstName: "Freddie", lastName: "Mercury", phone: "12345678"},
		{id: 2, firstName: "John", lastName: "Deacon", phone: "24567586"},
		{id: 3, firstName: "Brian", lastName: "May", phone: "34834575"},
		{id: 4, firstName: "Roger", lastName: "Taylor", phone: "45678545"},
		{id: 5, firstName: "John", lastName: "Lennon", phone: "564745674"},
		{id: 6, firstName: "Paul", lastName: "McCartney", phone: "456345656"},
		{id: 7, firstName: "George", lastName: "Harrison", phone: "34834575"},
		{id: 8, firstName: "Ringo", lastName: "Starr", phone: "45678545"}
	],
	current: createNewItem()
	
};
export default (state = initialState, action) => {
	let contacts = [...state.contacts];
	switch (action.type) {
		case ADD_CONTACT:
			const {contact} = action.payload
			let newItemIndex = contacts.findIndex(p => p.id === state.current.id)
			if (newItemIndex < 0) {
				contact.id = getNextId(contacts)
				contacts.push(contact);
			} else contacts[newItemIndex] = contact
			return {...state, contacts, current: contact};
		case SET_CURRENT:
			let {current} = action.payload
			if (!current) current = createNewItem()
			return {...state, current};
		case DELETE_CONTACT:
			let deleteItemIndex = contacts.findIndex(p => p.id === state.current.id)
			if (deleteItemIndex > -1) contacts.splice(deleteItemIndex, 1);
			return {...state, contacts, current: createNewItem()};
		default:
			return state;
	}
};

