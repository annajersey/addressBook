import React from "react";
import enzyme, {shallow, mount} from "enzyme";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import Main from "./index";

enzyme.configure({adapter: new Adapter()});
const mockStore = configureMockStore();

let store, FormWrapper, contacts;
beforeEach(() => {
    contacts = [];
    const current = {id: 1, firstName: "John", lastName: "Doe", phone: "123"};
    store = mockStore({contacts, current});
    FormWrapper = mount(<Provider store={store}><Main/></Provider>);
});

test("There are three text fields in the form", () => {
    expect(FormWrapper.find("input")).toHaveLength(3);
});

test("Component renders values of current contact in the form fields", () => {
    expect(FormWrapper.find("input").at(0).instance().value).toEqual("John");
    expect(FormWrapper.find("input").at(1).instance().value).toEqual("Doe");
    expect(FormWrapper.find("input").at(2).instance().value).toEqual("123");
});

