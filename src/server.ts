import app from "./app";
const port = process.env.PORT || 5000;

app.get("/",(req, res)=>{
    res.send("Vehicle rental system server is running...");
})


app.listen(port, ()=>{
    console.log(`vehicle rental system server is running on localhost:${port}`);
})