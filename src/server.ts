import express from 'express';
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get("/",(req, res)=>{
    res.send("Vehicle rental system backend is running...");
})


app.listen(port, ()=>{
    console.log(`vehicle rental system server is running on localhost:${port}`);
})