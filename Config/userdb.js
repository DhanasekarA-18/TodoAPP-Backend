const mongoose = require('mongoose');
require('dotenv/config');

const Connect =()=>{
mongoose.set('strictQuery', true);         
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_Connection,connectionParams).then(()=>{
    console.log("connected to db");
})
.catch((e)=>{
    console.log("error",e);
})
};

module.exports.Connect=Connect;