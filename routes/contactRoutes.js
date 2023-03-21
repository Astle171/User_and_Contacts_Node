import express from 'express'
const router = express.Router()
import {
  getContact,
  getContacts,
  postContact,
  putContact,
  deleteContact,
} from '../controller/contactController.js'
import { validateToken } from '../middleware/validateTokenHandler.js'

router.use(validateToken)
router.route('/').get(getContacts)
router.route('/:id').get(getContact)
router.route('/').post(postContact)
router.route('/:id').put(putContact)
router.route('/:id').delete(deleteContact)
export default router
