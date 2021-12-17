const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((e) => {
    console.log("Connection error");
  });
