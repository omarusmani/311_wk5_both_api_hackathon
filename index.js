const express = require("express")
// require("dotenv").config()
const app = express()
const port= process.env.PORT || 4002
const usersRouter = require("./routes/index");


app.use(express.json());
app.use("/", usersRouter);

app.get('/', (req, res) => {
    res.send('Welcome to our server!')
  })

  app.listen(port, () => {
    console.log(`Web server is listening on port ${port}!`);
   });