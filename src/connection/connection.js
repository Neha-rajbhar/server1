const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://rajrajbhar682:7AODrU4NNpyKUQc2@cluster0.qayr3qv.mongodb.net/KIT",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connection is done");
  })
  .catch((error) => {
    console.log("error in connecting");
  });
