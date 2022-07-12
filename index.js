const express = require("express");
// require("dotenv").config()
const app = express();
const port = process.env.PORT || 4002;
const carsRoute = require("./routes/CARS");
const mockDataRoute = require("./routes/MOCK_DATA");

app.use(express.json());
app.use(carsRoute, mockDataRoute);

app.get("/", (req, res) => {
  res.send("Welcome to our server!");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
