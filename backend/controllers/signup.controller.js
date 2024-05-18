import SignUp from "../model/signup.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { name, email, password, isjournalist } = req.body;
    const user = await SignUp.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new SignUp({
      name,
      email,
      password: hashPassword,
      isjournalist,
    });
    await newUser.save();
    res.status(201).json({ msg: "User created" });
  } catch (e) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SignUp.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Email" });

    const isMatched = await bcryptjs.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ msg: "Invalid Password" });
    } else {
      res.status(200).json({
        msg: "Login Successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isjournalist: user.isjournalist,
        },
      });
    }
  } catch (e) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
