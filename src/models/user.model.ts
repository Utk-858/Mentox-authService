import mongoose from "mongoose";
import { RolePermissionsMap } from "../config/role-permissions.map";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.keys(RolePermissionsMap),
    required: true,
  },
  department: { type: String }, // optional
  permissions: {
  type: [String],
},
});

userSchema.pre("save", function (this: any, next) {
  if (!this.permissions || this.permissions.length === 0) {
    this.permissions = RolePermissionsMap[this.role] || [];
  }
  next();
});

export default mongoose.model("User", userSchema);
