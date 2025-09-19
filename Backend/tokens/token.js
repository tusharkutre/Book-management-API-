import jwt from "jsonwebtoken";

//generate token for that specific user
const generateToken = ({ id, name, email }) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

//verify token for that specific user
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
