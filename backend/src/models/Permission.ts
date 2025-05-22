import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  access: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
});

export default mongoose.model("Permissions", permissionSchema);
