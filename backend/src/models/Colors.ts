import mongoose from "mongoose";

const colorsSchema = new mongoose.Schema(
  {
	name: { type: String, required: true },
	value: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Colors", colorsSchema);
