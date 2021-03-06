import React from "react";
import {Provider} from "react-redux";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import "./assets/styles.scss";
import {getStore} from "./config";

const store = getStore();

const App = () =>
    <Provider store={store}>
        <Sidebar/>
        <Main/>
    </Provider>;

export default App;
