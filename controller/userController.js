import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const userAvailable = await User.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error('User already exist')
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error('User data is not valid')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const verifyUser = await User.findOne({ email })
  if (verifyUser && (await bcrypt.compare(password, verifyUser.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: verifyUser.name,
          email: verifyUser.email,
          id: verifyUser.id,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: '30m' }
    )
    res.status(200).json({ accessToken })
  } else {
    res.status(401)
    throw new Error('email or password is incorrect')
  }
})

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

export { registerUser, loginUser, currentUser }
