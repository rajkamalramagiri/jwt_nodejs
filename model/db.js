const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("DB Connected!");
  } else {
    console.log("DB not connected", JSON.stringify(err));
  }
});
