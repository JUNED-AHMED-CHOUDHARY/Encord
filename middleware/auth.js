import jwt from "jsonwebtoken";
const authenticationMiddleware = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    console.log({decoded});
    res.status(200).json({_id:id,user_name:username})
  } catch (error) {
    console.log("Auth as Dash")
    throw new Error("Not authorized to access this route");
  }
};

export default authenticationMiddleware;
