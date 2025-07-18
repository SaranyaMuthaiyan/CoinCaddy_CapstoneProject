import express  from 'express'
import cors from 'cors'
import connectDb from './db.js'
import 'dotenv/config'

import Transaction from '..models/transaction.js'
import User from '..models/User.js';

const app= express()

const port = process.env.PORT

app.use(cors())

app.get()

app.get('/', (req, res) => {
    res.json(" Hello User") //connect to server
    
})

app.listen(port, () => {console.log("Listening to port: "  + port),
    connectDb() //connect to db
})