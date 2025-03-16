const mongoose = require("mongoose");

const connect = () => {
    // Set strictQuery to false to prepare for Mongoose 7 change
    mongoose.set('strictQuery', false);
    
    // Try to connect to MongoDB Atlas
    return mongoose.connect(
      "mongodb+srv://caddycool:caddycool@cluster0.xarvi.mongodb.net/acko?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ).then(() => {
      console.log("Connected to MongoDB successfully");
    }).catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
      console.log("Application will continue without database connection");
    });
}
//mongodb+srv://caddycool:caddycool@cluster0.xarvi.mongodb.net/acko?retryWrites=true&w=majority
//mongodb://localhost:27017/acko
module.exports=connect