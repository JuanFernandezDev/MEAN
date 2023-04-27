const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');
const { throwError } = require('rxjs');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const conn_str = 'mongodb+srv://juan:656465@cluster0.x8mlpw6.mongodb.net/?retryWrites=true&w=majority'

const connectToMongo = () => {
  mongoose.connect(conn_str)
    .then(() =>
      console.log("Connected to mongo Successful")
    )
}


const User = mongoose.model("User", {
  name: { type: String },
  description: { type: String },
});

app.post("/subir", async function (req, res) {
  User.collection.insertOne({ name: req.body.name, description: req.body.description })

  const user = await User.findOne({ name: req.body.name, description: req.body.description });
  const userId = user._id;
  const updatedUser = await User.findById(userId);
  res.json({ message: "User updated successfully", user: updatedUser });

});

app.get("/datos", async function (req, res) {
  const filter = {};
  const all = await User.find(filter);
  res.json(all);
});


app.delete("/borrar/:id", async (req, res) => {
  const id = req.params.id;

  await User.deleteOne({ _id: new mongoose.Types.ObjectId(id.toString()) })

  const updatedUser = await User.findById(id);
  res.json({ message: "User updated successfully", user: updatedUser });
})

app.put("/modificar/:id", async (req, res) => {
  const userId = req.params.id;

  await User.updateOne({ _id: new mongoose.Types.ObjectId(userId.toString()) }, { $set: { name: req.body.name, description: req.body.description } })

  const updatedUser = await User.findById(userId);
  res.json({ message: "User updated successfully", user: updatedUser });
});


connectToMongo()

app.listen(port, () => {
  console.log('listening on ' + port);
});
