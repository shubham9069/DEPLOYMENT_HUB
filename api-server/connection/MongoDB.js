const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOO_URI)
  .then(() => console.log("Connected to mongoo !"))
  .catch((err) => console.log(err));
