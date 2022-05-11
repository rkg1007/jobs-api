import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide user name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide user email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide user password"],
    minlength: 6,
    maxlength: 12,
  },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
})

export default mongoose.model("User", UserSchema);