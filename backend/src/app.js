const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());
app.use("/users", userRoutes);

mongoose
    .connect("mongodb+srv://NaninSutan:Zs502FJKC18EGwoN@baselogin.p4elf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() =>app.listen(5000), console.log("Server is listening on port 5000"))
    .catch((err) => console.log(err));