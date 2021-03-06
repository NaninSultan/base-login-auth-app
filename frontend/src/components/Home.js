import { 
    Typography,
    Card,
    CardContent
     } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseLoginActions } from "../Store";


const Home = () => {

    const dispatch = useDispatch();
    const [info, setInfo] = useState(false);

    const user = useSelector((store) => store.baseLogin.user);

    async function getInfo () {
        await axios.get('http://localhost:5000/users/getProfileInformation', {
            headers: {
                Authorization: `Bearer ${user}`
            }
        }).then(res => {
            setInfo(res.data);
            console.log(res.data)
        }).catch((err) => (err.response.data.message))

    }

    useEffect(() => {
        dispatch(baseLoginActions.setUser(sessionStorage.getItem('token')));
    }, [dispatch])

    useEffect(()=> {
        if (user) {
            getInfo();
        }
    }, [user])

    return (
        <>
        { !user &&<Typography marginTop="20px" textAlign="center" variant="h3">Homepage</Typography>}
        { user &&
            <Typography textAlign="center" variant="h3" marginTop="20px">
                Welcome {info.name}! <br/>
                You can view your profile info below:
            </Typography>
        }
        <Card style={{width: "fit-content", height: "fit-content", padding: "20px", backgroundColor: "lightblue", margin: "auto", marginTop: "50px"}}>
            { user &&
                <CardContent>
                <Typography textAlign="center" variant="h4">Username: {info.name}</Typography>
                <br />
                <Typography textAlign="center" variant="h4">Email: {info.email}</Typography>
                </CardContent>
            }
            { !user &&
                <CardContent>
                <Typography textAlign="center" variant="h4">Welcome to Auth App. Please Log in!</Typography>
                </CardContent>
            }
        </Card>
        </>
        
    )
}

export default Home;