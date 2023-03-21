import asyncHandler from 'express-async-handler'
import { Contact } from '../models/contactModel.js'

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id })
  res.status(201).json(contacts)
})

export const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id
  const contact = await Contact.findById(id)
  if (contact) {
    res.status(201).json(contact)
  } else {
    res.status(404)
    throw new Error('Contact not found')
  }
})

export const postContact = asyncHandler(async (req, res) => {
  const { name, email, number } = req.body
  if (!name || !email || !number) {
    console.log(name, email, number)
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const contact = await Contact.create({
    name,
    email,
    number,
    user_id: req.user.id,
  })
  res.status(201).json(contact)
})

export const putContact = asyncHandler(async (req, res) => {
  const id = req.params.id
  const contact = await Contact.findById(id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User dont have permission to update other user contact')
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(201).json(updatedContact)
})

export const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id

  const contact = await Contact.findById(id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User dont have permission to delete other user contact')
  }
  const deleteContact = await Contact.findByIdAndDelete(id)
  res.status(201).json(deleteContact)
})
