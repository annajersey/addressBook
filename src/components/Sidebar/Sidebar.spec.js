import React from "react";
import enzyme, {shallow, mount} from "enzyme";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import Sidebar from "./index"
import {SET_CURRENT} from "../../store/constants";

enzyme.configure({adapter: new Adapter()});
const mockStore = configureMockStore();

let store, sidebarWrapper, contacts;
beforeEach(() => {
	contacts = [
		{id: 1, firstName: "John", lastName: "Doe", phone: ''},
		{id: 2, firstName: "Lorem", lastName: "Ipsum", phone: ''}
	]
	let current = {id: 0, firstName: "", lastName: "", phone: ''}
	store = mockStore({contacts, current});
	store.dispatch = jest.fn();
	sidebarWrapper = mount(<Provider store={store}><Sidebar/></Provider>);
});


test("Sidebar renders list of contacts from the store", () => {
	expect(sidebarWrapper.find("li")).toHaveLength(2);
});

test("Clicking on the item dispatches the SET_CURRENT action with selected contact as a payload", () => {
	let li = sidebarWrapper.find("li").first()
	li.simulate("click");
	const action = {
		type: SET_CURRENT,
		payload: {
			current: contacts[0]
		}
	};
	expect(store.dispatch).toHaveBeenCalledWith(action);
});

