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

app.post("/api/addproduct", (req, res) => {
  let uid = req.body.uid;

  let productData = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    id: req.body.id,
    productPicUrl: req.body.productPicUrl,
  };

  userDatas
    .findOneAndUpdate({ uid: uid }, { $push: { products: productData } })
    .then(console.log("updated products array"));

  //console.log(productData, uid);
});

app.get("/api/userdetails", (req, res) => {
  let user = req.query.user;
  userDatas.find({ uid: user }).then((docs) => {
    res.send(docs);
  });
});

app.get("/api/getproducts", (req, res) => {
  let userId = req.query.user;
  userDatas.find({ uid: userId }).then((docs) => {
    res.send(docs[0].products);
  });
});

app.put("/api/deleteproduct", (req, res) => {
  let uid = req.body.uid;
  let itemId = req.body.itemId;

  userDatas
    .findOneAndUpdate({ uid: uid }, { $pull: { products: { id: itemId } } })
    .then((docs) => console.log("deleted product"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
