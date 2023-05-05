if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout.pug");
app.use(methodOverride('_method'))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require("mongoose");
const book = require("./models/book");
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	serverSelectionTimeoutMS: 5000
})
const db = mongoose.connection
db.on("error", err => console.error(err))
db.once("open", () => console.log('Connected to Mongoose'))

app.use("/", indexRouter);
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000);
