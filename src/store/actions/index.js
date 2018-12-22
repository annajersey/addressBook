import {ADD_PERSON, SET_CURRENT, DELETE_PERSON} from "../constants";

export function addPerson(person) {
    const action = {
        type: ADD_PERSON,
        payload: {
            person
        }
    };
    return action;
}

export function deletePerson() {
    const action = {
        type: DELETE_PERSON
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
