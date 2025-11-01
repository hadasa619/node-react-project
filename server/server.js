require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/dbConn")
const corsOptions = require("./config/corsOptions")
const { default: mongoose } = require("mongoose")

const PORT = process.env.PORT || 1500 
const app = express()
connectDB()
//middlewares 
app.use(cors(corsOptions)) 
app.use(express.json()) 
app.use(express.static("public"))

//routes 
app.use("/api/users", require("./routes/userRouter"))
app.use("/api/products", require("./routes/productRouter"))
app.use("/api/carts", require("./routes/cartRouter"))
app.use("/api/auth", require("./routes/authRouter"))


app.get("/",(req,res)=>{
res.send("this is the home page")
})

mongoose.connection.once("open", ()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})
})

mongoose.connection.on("error", (err)=>{
    console.log("error with connection to DB\n" + err);    
})

