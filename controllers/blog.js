import { Router } from "express";
import jwt from "jsonwebtoken";
const blogRouter = Router();
import Blog from "../models/blog.js";
import User from "../models/user.js";

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return res.json(blogs);
});

blogRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id).populate("user", {
    username: 1,
    name: 1,
  });
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

const getToken = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "").trim();
  }
  return null;
};

blogRouter.post("/", async (req, res) => {
  const body = req.body;
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "Token invalid" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res
      .status(400)
      .json({ error: "No users availabel to assign as a creator" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes !== undefined ? body.likes : 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  if (body.likes !== undefined && Object.keys(body).length === 1) {
    blog.likes = body.likes;
    const updatedBlog = await blog.save();
    return res.json(updatedBlog);
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "Token invalid" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }

  if (!blog.user || blog.user.toString() !== decodedToken.id) {
    return res.status(403).json({ error: "Unauthorized to update this blog" });
  }

  const blogs = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogs, { new: true });
  res.json(updatedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "Token invalid" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }

  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  if (blog.user.toString() !== decodedToken.id) {
    return res.status(403).json({ error: "Unauthorized to delete this blog" });
  }

  await Blog.findByIdAndDelete(id);
  res.status(204).end();
});

export default blogRouter;
