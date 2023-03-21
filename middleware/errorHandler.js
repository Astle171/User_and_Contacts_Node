export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  switch (statusCode) {
    case 400:
      res.send({
        title: 'Bad request',
        message: err.message,
        stacktrace: err.stack,
      })
      break
    case 401:
      res.send({
        title: 'Unauthorized',
        message: err.message,
        stacktrace: err.stack,
      })

      break
    case 403:
      res.send({
        title: 'Forbidden',
        message: err.message,
        stacktrace: err.stack,
      })

      break
    case 404:
      res.send({
        title: 'Not found',
        message: err.message,
        stacktrace: err.stack,
      })

      break
    default:
      res.send({
        title: '500 error',
        message: err.message,
        stacktrace: err.stack,
      })
      break
  }

  res.send({
    title: 'Unauthorized',
    message: err.message,
    stacktrace: err.stack,
  })
}
