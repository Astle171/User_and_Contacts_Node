import express from 'express'
import {
  currentUser,
  loginUser,
  registerUser,
} from '../controller/userController.js'
import { validateToken } from '../middleware/validateTokenHandler.js'
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/current').get(validateToken, currentUser)

export default router
