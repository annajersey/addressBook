import {ADD_CONTACT, EDIT_CONTACT, SET_CURRENT, DELETE_CONTACT} from "../constants";

export function addContact(newContact) {
    const action = {
        type: ADD_CONTACT,
        payload: {
            newContact
        }
    };
    return action;
}
export function editContact(contact) {
    const action = {
        type: EDIT_CONTACT,
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
