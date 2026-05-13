 const errorMiddleware = (err, req, res, next) => {
  console.log("🔥 ERROR:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Server Error",
  });
};

export default errorMiddleware;