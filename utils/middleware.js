import logger from "./logger.js";

const requestLogger = (req, res, next) => {
  const { password, ...bodyWithoutPassword } = req.body;
  logger.info(`${req.method} ${req.path} ${JSON.stringify(bodyWithoutPassword)}`);
  next();
};

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).json({ err: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ err: err.message });
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    logger.error("Duplicate key error:", err);
    return res.status(400).json({
      err: "expected `username` to be unique",
    });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({err: 'Token invalid'})
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      err: 'token expired'
    })
  }

  // Handle unexpected errors
  res.status(500).json({ error: "Something went wrong!" });
};

export default {
  requestLogger,
  unknownEndPoint,
  errorHandler,
};
