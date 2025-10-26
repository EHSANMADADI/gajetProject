import UserModel from '../ModelDataBase/UserModel.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password, age, gender, firstName, lastName, info = '' } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });
    if (!username || !password || !gender || !firstName || !lastName) {
      return res.status(400).json({ error: 'gender و firstName,lastName,username,password الزامی هستند' });
    }
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword, age,gender,firstName,lastName,info });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid passwprd" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
