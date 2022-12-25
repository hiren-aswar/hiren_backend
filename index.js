const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");


const app = express();

const user = require("./models/user");


app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://hiren123:hiren123@cluster0.unp4crn.mongodb.net/noteflutter");
app.get("/note/list", async (req, res) => {
  console.log("hello");
  const data = await user.find();
   console.log(data);
  res.json(data);
});
app.post("/note/add", async (req, res) => {
  console.log(req.body);
  const data = new user({ 
    id: req.body.id,
    userid: req.body.userid,
    title: req.body.title,
    content: req.body.content,
  });
  const result = await data.save();
  res.json(result);
});
app.post("/note/delet", async (req, res) => {
  console.log(req.body);
  const data = await user.deleteOne({ id: req.body.id });
   res.json(data);
});
app.post("/note/update", async (req, res) => {
  console.log(req.body);
  const data = await user.findByIdAndUpdate(req.body.id,req.body);
   res.json(data);
});

const PORT=process.env.PORT||3001;
app.listen(PORT, () => {
  console.log("server is listing");
});