const isAdmin = (req, res, next) => {
  console.log("inside isAdmin");
  if (!req.user) {
    return res.status(401).json({ message: "User is not logged in" }); // 401 Unauthorized
  }
  console.log(req.user)
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized: User is not Admin" }); // 403 Forbidden
  }
  next();
};

export { isAdmin };
