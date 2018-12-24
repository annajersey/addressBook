import React from "react";
import enzyme, {shallow, mount} from "enzyme";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import Sidebar from "./index"

enzyme.configure({adapter: new Adapter()});
const mockStore = configureMockStore();

let sidebarWrapper;
beforeEach(() => {
	let contacts = [
		{id: 1, name: "John", lastname: "Dou"},
		{id: 2, name: "Lorem", lastname: "Ipsum"}
	]
	let current = {id: 0, name: "", lastname: ""}
	const store = mockStore({contacts, current});
	sidebarWrapper = mount(<Provider store={store}><Sidebar/></Provider>);
});


test("Sidebar renders list of contacts from the store", () => {
	expect(sidebarWrapper.find("li")).toHaveLength(2);
});

// test("Clicking on the item selects it", () => {
// 	expect(sidebarWrapper.find("li.selected")).toHaveLength(0);
// 	let li = sidebarWrapper.find("li").first()
// 	//li.simulate("click");
// 	expect(sidebarWrapper).toMatchSnapshot()
// 	//expect(sidebarWrapper.find(".selected")).toHaveLength(1);
//
// });

