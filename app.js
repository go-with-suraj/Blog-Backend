import config from "./utils/config.js";
import express from 'express'
import 'express-async-errors';
const app = express()
import cors from 'cors'
import blogRouter from "./controllers/blog.js";
import usersRouter from "./controllers/users.js";
import middleware from "./utils/middleware.js";
import logger from "./utils/logger.js";
import mongoose from "mongoose";
import loginRouter from "./controllers/login.js";


mongoose.set('strictQuery', false)


mongoose.connect(config.url)
.then(() => logger.info('mongoDB connected'))
.catch(err => logger.error('error connecting to MongoDB'))

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

export default app
