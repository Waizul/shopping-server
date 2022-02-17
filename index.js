const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors')
const port = process.env.PORT||5000

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const cartRoute = require("./routes/cart");
const productRoute = require("./routes/product");
const paymentRoute = require("./routes/stripe");

mongoose
  .connect(process.env.DB_URL)
  .then(console.log("mongodb connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors())
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/checkout", paymentRoute);


app.get("/", (req, res) => {
  res.send("Shopping server");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
