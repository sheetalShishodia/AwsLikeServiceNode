const  app = require('./app');
// const port = 3000;


const PORT = process.env.PORT|| 4000;


app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(PORT,()=>{
   console.log("Server listen to ports 3000");
})