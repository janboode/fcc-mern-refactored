const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const exercisesRouter = require("./routes/exercises")
const usersRouter = require("./routes/users")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
console.log(`uri: ${uri}`)
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB Connection to exercise tracker succesful!`))
  .catch(error => {
    console.log(`There was an error: ${error}`)
  })

// const connection = mongoose.connection
// connection.once("open", () => {
//   console.log("Mongo DB database connection established successfully")
// })

app.use("/exercises", exercisesRouter)
app.use("/users", usersRouter)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
