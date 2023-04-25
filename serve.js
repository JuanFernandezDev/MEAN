const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');


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

app.post("/prueba", function (req, res) {
    User.collection.insertOne({ name: req.body.name, description: req.body.description })
});

app.get("/prueba", async function (req, res) {
    const filter = {};
    const all = await User.find(filter);
    res.json(all);
});

/* app.get('/prueba/(:id)', (req, res) => {
    console.log("Hola")
    const id = req.params.id;
    console.log(id)
    User.deleteOne({ _id: new mongoose.Types.ObjectId(id.toString()) })
}); */

app.delete("/prueba/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await User.deleteOne({ _id: new mongoose.Types.ObjectId(id.toString()) })
    res.send("Done")

})

connectToMongo()

app.listen(port, () => {
    console.log('listening on ' + port);
});