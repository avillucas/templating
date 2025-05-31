function ErrorMiddleware (err, req, res, next)  {
  console.error(err.stack); // Log interno
  const statusCode = err.status ?? 500;
  const title = err.title ?? "Error";
  const message = err.message ?? "Se ha generado un error inesperado en el servidor.";
  //if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json({
      error: true,
      title,
      message,
    });
  //}
}

module.exports = {
    ErrorMiddleware
};