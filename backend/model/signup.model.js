import mongoose from "mongoose";

const signupSechma = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isjournalist: {
    type: Boolean,
    default: false,
  },
});
const SignUp = mongoose.model("SignUp", signupSechma);
export default SignUp;
