import jwt from "jsonwebtoken";
import UserSchema from "../model/user.js";

const createJWT = (user, name) => {
  return jwt.sign({ userId: user._id, name: name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserSchema.create({ name, email, password });
    const token = createJWT(user, name);
    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Please Provide Correct Email Or Password" });
  }

  try {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const token = createJWT(user, user.name);
    res.status(200).json({ user: { name: user.name }, token ,email});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export { register, login };
