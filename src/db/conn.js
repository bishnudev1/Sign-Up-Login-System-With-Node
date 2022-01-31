const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/iBlog", {
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log("Connection Successfully to MongoDB");
}).catch((e)=>{
    console.log(e);
});