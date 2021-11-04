import { Card, CardContent, TextField, Typography, Button, CardActions } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { baseLoginActions } from "../Store";
import axios from 'axios';

const Signup = () => {

    const [msg, setMsg] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value})
    }


const closeHandle = () => {
    dispatch(baseLoginActions.setModal({ login: false, signup: false }));
}

const showLogin = () => {
    dispatch(baseLoginActions.setModal({ login: true, signup: false }));
}

    const submitHandle = () => {
        axios.post('http://localhost:5000/users/signup', { name: input.name, email: input.email, password: input.password })
            .then(res => {
                console.log(res);
                console.log(res.data)
            }
        ).catch(err => setError(err.response.data.message))
        if(input.password !== input.confirmPassword) {
            setError("Password confiramtion failed. Please try again.")
        }
    }

    return (
        <div className="backdrop">
        <Card style={{ position: "fixed", top: "50%", left: "50%", transform:"translate(-50%, -50%)", textAlign: "center", width: "fit-content", height: "fit-content", padding: "30px" }}>
            <CardContent >
                <TextField required type="text" label="Name" name="name" style={{ marginBottom: "10px" }} onChange={onChange} value={input.name} />
                <br />
                <TextField required type="text" label="Email" name="email" style={{ marginBottom: "10px" }} onChange={onChange} value={input.email} />
                <br />
                <TextField required type="text" label="Password" name="password" style={{ marginBottom: "10px" }} onChange={onChange} value={input.password} />
                <br />
                <TextField required type="text" label="Confirm Password" name="confirmPassword"  onChange={onChange} value={input.confirmPassword}/>
                <br />
                <Typography color="red">{error}</Typography>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" onClick={closeHandle}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={submitHandle}>
                    Sign Up
                </Button>
            </CardActions>
            <Typography style={{margin: "auto", textAlign: "center", cursor: "pointer"}} color="primary" onClick={showLogin}>
                    Already have an account? Log in here.
            </Typography>
        </Card>
        </div>
    )
}

export default Signup;