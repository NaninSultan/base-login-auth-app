import React from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from './components/Signup';

const App = () => {

    const modal = useSelector((store) => store.baseLogin.modal);

    return (
        <>
            <Header/>
            <Home />
            {modal.login && <Login />}
            {modal.signup && <Signup />}
        </>
    )
}

export default App;