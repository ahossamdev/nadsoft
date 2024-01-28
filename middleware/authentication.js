const authenticate = (req, res, next) => {
  const validUserName = process.env.USER_NAME || "nadsoft";
  const validPassword = process.env.PASSWORD || "nadsoft123*";
  const { name, password } = req.headers;
  console.log(name, password);
  console.log(validUserName, validPassword);
  if (
    name?.toLowerCase() !== validUserName.toLowerCase() ||
    password?.toLowerCase() !== validPassword.toLowerCase()
  ) {
    console.log(name?.toLowerCase() !== validUserName.toLowerCase());
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = { authenticate };
