const express = require('express');
const app = express();
const dbConnect = require('./Connection/dbConnect');
const userRoutes = require('./Routes/UserRoute/createUser')
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use('/user',userRoutes);


app.listen(8080,()=>{
    console.log('Server is running on port 8080');
    dbConnect();
})