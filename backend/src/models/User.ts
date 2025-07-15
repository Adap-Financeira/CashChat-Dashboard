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
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    documentType: {
      type: String,
      enum: ["CPF", "CNPJ"],
      required: true,
    },
    documentNumber: {
      type: String,
      unique: true,
      required: true,
    },
    companySegment: {
      type: String,
      required: false,
    },
    mainActivity: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // cria automaticamente createdAt e updatedAt
    _id: true,
  }
);

export default mongoose.model("User", userSchema);
