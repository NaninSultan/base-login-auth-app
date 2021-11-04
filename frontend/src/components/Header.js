import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { baseLoginActions } from "../Store";

const Header = () => {

    const dispatch = useDispatch();

    const clickHandle = () => {
        dispatch(baseLoginActions.setModal({ login: true, signup: false }));
    }

    const user = useSelector((store) => store.baseLogin.user);

    const logoutHandle = () => {
        sessionStorage.removeItem('token');
        window.location.reload();
    }

    const registerHandle = () => {
        dispatch(baseLoginActions.setModal({ login: false, signup: true }));
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Base Login/Auth App
                </Typography>
                { !user &&
                <Button variant="contained" color="primary" onClick={clickHandle} >
                    Login
                </Button>
                }
                { !user &&
                <Button style={{ marginLeft: "5px"}} variant="contained" color="primary" onClick={registerHandle} >
                    Register
                </Button>
                }
                { user &&
                <Button onClick={logoutHandle} variant="contained" style={{ marginLeft: "5px"}} color="primary">
                    Logout
                </Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;