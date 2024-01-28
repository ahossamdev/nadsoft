const logRequest = (req, res, next) => {
  const currentDate = new Date().toUTCString();
  console.log(`[${currentDate}] - ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = { logRequest };
