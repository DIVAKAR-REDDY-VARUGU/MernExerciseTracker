// console.clear();
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

require("dotenv").config();

const port=process.env.PORT||5000;
const app=express();

app.use(express.json());    // json middleware is used to convert date to json formate (i think .... )
app.use(cors());    // cors middle ware is including in file 


const uri = `mongodb+srv://DIVAKAR:DIVAKAR@cluster0.1ua7o.mongodb.net/MERN_EXERCISE_APP?retryWrites=true&w=majority`;
// mongoose.connect(uri,(err)=>{
//   if(err)console.log("error in connection ");
//   else console.log("Database is connected ");
// })

//  or 

mongoose.connect(uri).then(()=>{console.log("Database is connected ")}).catch((err)=>{console.log("somthing error in connecting to database ...")})


const user=require(`./routes/user`);
const exercise=require(`./routes/exercise`);

app.use('/users',user);
app.use('/exercises',exercise);



app.listen(port,(err)=>{
    if(err)console.log("somthing went wrong dude...");
    else console.log(`server is started man !!! on port ${port}`);
})