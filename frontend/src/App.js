import React from 'react';
import axios from "axios";
import cookie from "react-cookies";
import './App.css';
import InstanceList from './components/InstanceList';


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";


function App() {
    return (
        <div className="App">
            Hello, World!
            <InstanceList/>
        </div>
    );
}

export default App;
