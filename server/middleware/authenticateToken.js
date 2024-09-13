import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res.status(403).json({ message: "Unauthorized Entry: Notifying Admin" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
