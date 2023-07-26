const express = require('express');
const app = express();
const connect = require('./dbConfig/connection');
const Models = require("./models/employeeModels")
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const SECRET_KEY = "TW2aI0mt2ia3lr2Is5T";
const Auth = require('./Auth/auth.js')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    const data = await Models.findOne({ email })
    
    if (!data) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newEmployee = new Models({
            email: email,
            password: hashedPassword
        })
        const response = await newEmployee.save();
        res.send({ message: "OK", data: response, status: 200 })
    } else {
        res.send({ message: "User Already Exist" });
    }
})
app.post('/login', async (req, res) => {
    console.log("loggedIn creadentials", req.body)
    const { email, password } = req.body;
    const check = await Models.findOne({ email })
    console.log(check)
    if (check.email == email) {
        // console.log("Exist")
        const passCheck = await bcrypt.compare(password, check.password)
        // console.log("Password Matching",passCheck)
        if (!passCheck) {
            res.send({ message: "NOT_OK" })
        } else {
            await jwt.sign({ check }, SECRET_KEY, (error, token) => {
                if (error) {
                    res.send({ message: "Error While Generating the Token", error, status: 404 })
                } else {
                    // console.log("JWT token is :",token)
                    res.send({ message: "OK", Token: token, status: 200 })
                }
            })
        }
    } else {
        // console.log("Not Exist")
        res.send({ message: "User Credentials Wrong" })
    }
})
app.post('/auth', Auth, async(req, res) => {
    const id = req.token.check._id
    const check = await Models.findOne({ _id:id })
    console.log("getDetails",check)
    res.send({ message: "Authenticated Successfully", userData:check })
})

app.listen(8080, () => {
    console.log("Server Connected Successfully at port : 8080")
    connect()
})
