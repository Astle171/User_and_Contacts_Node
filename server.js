import express from 'express'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { connectDB } from './config/dbConnection.js'
dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use('/api/contacts', contactRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Listening at port no ${process.env.PORT}`)
})
