const express=require("express");
const {connection}=require("./db");
const { userRouter } = require("./routes/user.routes");
const {noteRouter}=require("./routes/note.routes")

const app=express();
app.use(express.json());

app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(5000,async ()=>{
    try {
        await connection
        console.log("connected to mongodb")
        console.log("server is running at port no. 5000");        
    } catch (error) {
        console.log(error)
    }
})