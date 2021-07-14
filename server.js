const express = require ('express')
const mongoose = require('mongoose')


const port = 5000;


const User = require("./models/User");

require("dotenv").config({ path: "./config/.env" });
const mongoURI =
  "mongodb+srv://aida:Petitpoussin24@cluster0.youhs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  (err) => (err ? console.log("error", err) : console.log("Connected"));
const app = express();

app.use(express.json());

app.listen(5000, () => {
    console.log('Server app listening on port ' + port);
});


app.post("/add", (req, res) => {
    const { firstName, lastName, emailAddress } = req.body;
    let newUser = new User({ firstName, lastName, emailAddress });
    newUser
      .save()
      .then(() => res.json({ msg: "User added " }))
      .catch((err) => console.log(err));
  });

  //edit user by id
app.put("/edit/:id", (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      (err, data) => {
        err ? console.log(err) : res.json({ msg: "user was updated" });
      }
    );
  });


  // delete user by id
app.delete("/delete/:id", (req, res) => {
    User.findByIdAndDelete(
      { _id: req.params.id },
      { ...req.body },
      (err, data) => {
        err ? console.log(err) : res.json({ msg: "user was deleted" });
      }
    );
  });

  