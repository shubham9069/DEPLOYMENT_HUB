const mongoose  = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    avatar_url: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const userCollection = mongoose.model("user", schema);

module.exports = userCollection;
