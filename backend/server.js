require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const port = process.env.PORT
const url = process.env.MONGO_URL

const Users = require("./models/userModels")
const AboutMe = require("./models/aboutModel")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

mongoose.connect(url, function (err) {
  if (!err) {
    console.log("Database connected");
  } else {
    console.log(err);
  }
})

// const data = [
//   {
//     title: "Ime i prezime",
//     description: "Mihalj Tandi",
//   },
//   {
//     title: "Ime i prezime1",
//     description: "Mihalj Tandi1",
//   },
// ]



// data.forEach((el) => {
//   const newData = new AboutMe({
//     title: el.title,
//     description: el.description,
//   })
//   newData.save()
// })

app.get("/", (req, res) => {
  AboutMe.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
})

app.post('/login', (req, res) => {
  // console.log(req);
  const reqBody = req.body
  console.log(reqBody);
  const foundUser = Users.findOne(reqBody, (err, data) => {
    if (err) {
      const errorMsg = `Error on getting user from DB: ${err}`
      res.status(416).send(errorMsg)
      return
    }
    res.send(data ? data : "User not found")
  })
})

app.listen(`${port}`, () => {
  console.log(`Listening on port ${port}`)
  console.log(`http:/localhost: ${port}`)
})
