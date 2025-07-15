import express  from 'express'
import cors from 'cors'
import connectDb from './db.js'
import 'dotenv/config'

const app= express()

const port = process.env.PORT

app.use(cors())

app.get('/', (req, res) => {
    res.json(" Hello User") //connect to server
    
})

app.listen(port, () => {console.log("Listening to port: "  + port),
    connectDb() //connect to db
})