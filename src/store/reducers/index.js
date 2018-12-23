import {ADD_PERSON, DELETE_PERSON, SET_CURRENT} from "../constants";

const initialState = {
	addressBookItems: [
		{id: 1, name: "Test1", lastname: "Test2"},
		{id: 2, name: "A1", lastname: "a1"},
		{id: 3, name: "qwerty", lastname: "qwerty"},
		{id: 4, name: "qwerty123", lastname: "qwerty"}
	],
	current: {id: 1, name: "Test1", lastname: "Test2"}
	
};
export default (state = initialState, action) => {
	let addressBookItems = [...state.addressBookItems];
	switch (action.type) {
		case ADD_PERSON:
			const {person} = action.payload
			let newItemIndex = addressBookItems.findIndex(p => p.id === state.current.id)
			if (newItemIndex<0) {
				person.id=getNextId(addressBookItems)
				addressBookItems.push(person);
			}
			else addressBookItems[newItemIndex] = person
			return {...state, addressBookItems, current:createNewItem()};
		case SET_CURRENT:
			let {current} = action.payload
			if (!current) current = createNewItem()
			return {...state, current};
		case DELETE_PERSON:
			let deleteItemIndex = addressBookItems.findIndex(p => p.id === state.current.id)
			if(deleteItemIndex>-1) addressBookItems.splice(deleteItemIndex, 1);
			return {...state, addressBookItems, current:createNewItem()};
		default:
			return state;
	}
};

const getNextId = (addressBookItems) => {
	return Math.max(...addressBookItems.map(p => p.id), 0) + 1
}
const createNewItem = () => {
	return  {id: parseFloat(Math.random()).toFixed(3), name: '', lastname: ''}
}