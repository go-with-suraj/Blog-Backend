import { test, beforeEach, describe, after } from "node:test";
import assert from "node:assert";

import helper from "./test_helper.js";
import bcrypt from "bcryptjs";
import app from "../app.js";
import User from "../models/user.js";
import supertest from "supertest";
import { response } from "express";

const api = supertest(app);

describe("User Creation Validation", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "spro",
      passwordHash,
    });
    await user.save();
  });

  test("fails if username is missing", async () => {
    const newUser = {
      name: "Test User",
      password: "password123",
    };

    const response = await api.post("/api/users").send(newUser);
    assert.strictEqual(response.status, 400);
    assert.strictEqual(
      response.body.error,
      "Username and password are required"
    );
  });

  test("fails if password is missing", async () => {
    const newUser = {
      name: "testUser",
      name: "TestUser",
    };
    const response = await api.post("/api/users").send(newUser).expect(400);
    assert.strictEqual(
      response.body.error,
      "Username and password are required"
    );
  });

  test("fails if username and password is less than 3 characters", async () => {
    const newUser = {
      username: "va",
      name: "Test User",
      password: "pw",
    };
    const response = await api.post("/api/users").send(newUser).expect(400);

    assert.strictEqual(
      response.body.error,
      "Username and password must be atleast 3 characters long."
    );
  });

  test("fails if username is not unique", async () => {
    const user2 = {
      username: "spro", // Trying to create a user with the same username as the first one
      name: "User Two",
      password: "password456",
    };

    const response = await api.post("/api/users").send(user2);
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "expected `username` to be unique");
  });
});

describe('POST /api/blogs', () => {
  test('should return 401 Unauthorized if not token if provided', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 10
    }
    const response = await api
    .post('/api/blogs')
    .send(newBlog)

    assert.strictEqual(response.status, 401)
    assert.strictEqual(response.body.error, 'Token missing')

  })
})
