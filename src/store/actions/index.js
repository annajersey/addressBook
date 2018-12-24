import {ADD_CONTACT, SET_CURRENT, DELETE_CONTACT} from "../constants";

export function addContact(contact) {
    const action = {
        type: ADD_CONTACT,
        payload: {
            contact
        }
    };
    return action;
}

export function deleteContact() {
    const action = {
        type: DELETE_CONTACT
    };
    return action;
}

export function setCurrent(current) {
    const action = {
        type: SET_CURRENT,
        payload: {
            current
        }
    };
    return action;
}
