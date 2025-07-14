import express  from 'express'
const app= express();
const port = 8080;

app.get('/', (req, res) => {
    res.send(" Hello User")
})

app.listen(port, () => console.log("Listening to port: "  + port))