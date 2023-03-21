import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const validateToken = asyncHandler(async (req, res, next) => {
  let token
  let authHeader = req.headers.Authorization || req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401)
        throw new Error('user is not authorized')
      }
      req.user = decoded.user
      next()
    })
    if (!token) {
      res.status(401)
      throw new Error(
        'user is not authorized or token is missing in the request'
      )
    }
  }
})

export { validateToken }
