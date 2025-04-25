import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });
  await mongoose.connect(`${process.env.MONGO_URI}/dadobyaptest`); // hyda bel browsecolletion el esm lasese la ela aw lpath te3a
};

export default connectDB;
