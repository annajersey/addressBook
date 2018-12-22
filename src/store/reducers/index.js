import {ADD_PERSON, DELETE_PERSON, SET_CURRENT} from "../constants";

const initialState = {
	addressBookItems: [
		{id: 1, name: "Test1", lastname: "Test2"},
		{id: 2, name: "A1", lastname: "a1"}
	],
	current: {id: 1, name: "Test1", lastname: "Test2"}
	
};
export default (state = initialState, action) => {
	let addressBookItems = [...state.addressBookItems];
	switch (action.type) {
		case ADD_PERSON:
			const {person} = action.payload
			let newItemIndex = addressBookItems.findIndex(p => p.id === state.current.id)
			if (newItemIndex<0) addressBookItems.push(person);
			else addressBookItems[newItemIndex] = person
			return {...state, addressBookItems};
		case SET_CURRENT:
			let {current} = action.payload
			if (!current) current = createNewItem(addressBookItems)
			return {...state, current};
		case DELETE_PERSON:
			let deleteItemIndex = addressBookItems.findIndex(p => p.id === state.current.id)
			if(deleteItemIndex>-1) addressBookItems.splice(deleteItemIndex, 1);
			return {...state, addressBookItems, current:createNewItem(addressBookItems)};
		default:
			return state;
	}
};


const createNewItem = (addressBookItems) => {
	return  {id: Math.max(...addressBookItems.map(p => p.id), 0) + 1, name: '', lastname: ''}
}