const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
    process.exit(1);
  }
};

module.exports = connectDB;
