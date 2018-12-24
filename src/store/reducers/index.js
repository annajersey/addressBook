import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT} from "../constants";

const getNextId = (contacts) => {
	return Math.max(...contacts.map(p => p.id), 0) + 1
}
const createNewItem = () => {
	return {id: parseFloat(Math.random().toFixed(3)), name: '', lastname: '', phone: ''}
}
const initialState = {
	contacts: [
		{id: 1, name: "Test1", lastname: "Test2", phone: 123},
		{id: 2, name: "A1", lastname: "a1"},
		{id: 3, name: "qwerty", lastname: "qwerty"},
		{id: 4, name: "qwerty123", lastname: "qwerty"}
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
			return {...state, contacts};
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

