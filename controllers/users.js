import { Router } from "express";
const usersRouter = Router()
import User from "../models/user.js";
import bcrypt from 'bcryptjs'


usersRouter.get('/', async (req, res) => {
    const user = await User.find({}).populate('blogs')
    res.json(user)
})

usersRouter.post('/', async (req, res) =>{
   const {username, name, password} = req.body

   const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  }

   // validation checks
   if(!username || !password) {
    return res.status(400).json({error: 'Username and password are required'})
   }

   if(username.length < 3 || password.length < 3) {
    return res.status(400).json({error: 'Username and password must be atleast 3 characters long.'})
   }

   const saltRounds = 10
   const passwordHash = await bcrypt.hash(password, saltRounds)

   const user = new User({
    username,
    name,
    passwordHash
   })

   const savedUser = await user.save()
   res.status(201).json(savedUser)
})

export default usersRouter