const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
var _ = require("lodash");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()); //enable Access-Control-Origin from all sources using cors package

const port = 5000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.REACT_APP_MONGODBURL);
}

const userdataSchema = new mongoose.Schema({
  uid: String,
  email: String,
  fname: String,
  lname: String,
  phoneNumber: String,
  accountType: String,
  cart: Array,
  orders: Array,
  products: Array,
  ordersReceived: Array,
});

const userDatas = mongoose.model("userdatas", userdataSchema);

app.post("/api/signup", (req, res) => {
  let userDataObj = new userDatas({
    uid: req.body.uid,
    email: req.body.email.toLowerCase(),
    fname: req.body.fname,
    lname: req.body.lname,
    phoneNumber: req.body.phoneNumber,
    accountType: req.body.accountType,
    cart: [],
    orders: [],
    products: [],
    ordersReceived: [],
  });

  //console.log(userDataObj);

  userDataObj.save();
});

app.get("/api/userdetails", (req, res) => {
  let user = req.query.user;
  userDatas.find({ uid: user }).then((docs) => {
    res.send(docs);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
