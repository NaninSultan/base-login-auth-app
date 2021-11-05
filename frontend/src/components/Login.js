import { Card, CardContent, TextField, Typography, Button, CardActions } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { baseLoginActions } from "../Store";

const Login = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState(false);

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }


    const closeHandle = () => {
        dispatch(baseLoginActions.setModal({ login: false, signup: false }));
    }

    const showSignup = () => {
        dispatch(baseLoginActions.setModal({ login: false, signup: true }));

    }

    async function handleSignin () {
        await axios.post('http://localhost:5000/users/signin', { email: input.email, password: input.password })
            .then(res => {
                let token = res.data.token;
                dispatch(baseLoginActions.setUser(token));
                sessionStorage.setItem('token', token)
                console.log('login success');
                console.log(res.data.token);
            }
            
        ).catch(err => setError(err.response.data.message))

    }

    return (
        <div className="backdrop">
        <Card style={{ position: "fixed", top: "50%", left: "50%", transform:"translate(-50%, -50%)", textAlign: "center", width: "fit-content", height: "fit-content", padding: "30px"  }}>
            <CardContent style={{}} >
                <TextField type="text" label="Email" name="email" value={input.email} onChange={onChange} style={{ marginBottom: "10px" }} />
                <br />
                <TextField type="password" label="Password" name="password" value={input.password} onChange={onChange} />
            <Typography color="red">{error}</Typography>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <Button variant="contained" onClick={closeHandle}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleSignin}>
                    Log In
                </Button>
            </CardActions>
            <Typography style={{margin: "auto", textAlign: "center", cursor: "pointer", marginTop: "20px"}} color="primary" onClick={showSignup}>
                    Don't have an account? Register here.
            </Typography>
        </Card>
        </div>
    )
}

export default Login;