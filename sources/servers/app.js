const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login-google", (req, res) => {
  console.log(req.body);
});

app.listen(port, (_) => console.log(`Application is working at ${port}`));
