import express  from 'express'
import cors from 'cors'

const app= express()

const port = 8080

app.use(cors())

app.get('/', (req, res) => {
    res.json(" Hello User")
})

app.listen(port, () => console.log("Listening to port: "  + port))