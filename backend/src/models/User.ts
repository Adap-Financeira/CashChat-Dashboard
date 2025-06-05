import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // cria automaticamente createdAt e updatedAt
    _id: true,
  }
);

export default mongoose.model("User", userSchema);
