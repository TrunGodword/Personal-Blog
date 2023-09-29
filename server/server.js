const express = require("express")
const cors = require("cors")
const app = express()
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const cookieParser = require("cookie-parser")
const fs = require('fs')

const connectDB = require("./config/db")
const userModel = require("./models/userModel")
const blogModel = require("./models/blogModel")
const uploadMiddleware = multer({dest:"uploads/"})

app.use(cors({credentials:true, origin:"http://localhost:5173"}))
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + "/uploads"))
dotenv.config()
connectDB()

const port = process.env.PORT
const salt = bcrypt.genSaltSync(16)
const secretSalt = "12y3812312t3bt12837"

app.post('/post', uploadMiddleware.single('file'), async (req, res)=>{
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded.' });
    }
    const {originalname, path} = req.file;
    const parts = originalname.split ('.')
    const ext = parts[parts.length-1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    
    const {title, summary, content} = req.body
    const postDoc = await blogModel.create({
        title,
        summary,
        content,
        cover: newPath,
    })
    res.json(postDoc)
})

app.get('/post', async (req,res)=>{
    res.json(await blogModel.find())
})

app.post("/register", async (req, res)=>{
    const {username, password} = req.body
    // res.json(`${process.env.URL}`)
    await userModel.create({
        username, 
        password: bcrypt.hashSync(password, salt)})
    res.json({requestData:{username, password}})
})

app.post("/login", async (req,res)=>{
    const {username, password} = req.body
    const userDoc = await userModel.findOne({username})
    const passwordTrue = bcrypt.compareSync(password, userDoc.password)
    if (passwordTrue){
        jwt.sign({username,id:userDoc._id}, secretSalt, {}, (error, token)=>{
            if (error) return res.status(500).json({ error: 'An error occurred while signing the token.' });
            res.cookie("token", token, { httpOnly: true }).json({
                id:userDoc._id,
                username,
            })
        })
    } else{
        res.status(400).json("wrong credentials")
    }
})

app.get("/profile", (req,res)=>{
    const {token} = req.cookies
    if (!token) return res.status(403).json({ error: 'No token provided.' });
    jwt.verify(token, secretSalt, {}, (error, info)=>{
        if (error) return res.status(500).json({ error: 'An error occurred while verifying the token.' });
        res.json(info)
    })
})

app.post("/logout", (req,res)=>{
    res.cookie('token', '').json('ok')
})

app.listen(port, (req, res)=>{
    console.log(`Port is live at ${port}`)
})