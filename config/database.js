const mongoose = require("mongoose");
require("dotenv").config();

// const dbConnect = () => {
//   mongoose.connect(process.env.DATABASE_URL)
//     .then(() => console.log("DB connected"))
//     .catch((error) => {
//       console.log("Something went wrong with the DB connection:");
//       console.error(error.message);
//       process.exit(1);
//     });
// };

// module.exports = dbConnect;

const conn = mongoose.createConnection(`mongodb://127.0.0.1:27017/sheetaldatabase`).on('open',()=>{
    console.log("mongo connect")

}).on('error',()=>{
    console.log("hey error")
});

module.exports = conn
