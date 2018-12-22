import {createStore} from "redux";
import reducer from "../store/reducers";

export const getStore = () => {
    let store;
    if (process.env.NODE_ENV === "development") {
        store = createStore(
            reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    } else {
        store = createStore(reducer);
    }
    return store;
};

