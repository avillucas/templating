const ErrorMiddleware = (err, req, res, next) => {
  console.log('error',err.stack); // Log interno
  const statusCode = err.status ?? 500;
  const title = err.title ?? "Error";
  const message = err.message ?? "Se ha generado un error inesperado en el servidor.";
  return res.status(statusCode).json({
    error: true,
    title,
    message,
  });
}

module.exports =   ErrorMiddleware;