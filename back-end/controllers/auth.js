const db = require("../db");
const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const verifyToken = (token) => {
  try {
    const decoded = verify(token, "SECRET");
    return decoded; // Returns the decoded payload
  } catch (error) {
    console.log(error.message);
    return null; // Returns null if token verification fails
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("select id, username from users");

    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.register = async (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);

    await db.query(
      "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, username, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "The registration was successful",
    });
  } catch (error) {
    console.error("Error during user registration:", error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;
  let payload = {
    id: user.id,
    email: user.username,
  };

  try {
    const token = await sign(payload, "SECRET");

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.diarypage = async (req, res) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decodedPayload = verifyToken(token);
    if (!decodedPayload) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const { id, email } = decodedPayload;

    const { diaryEntries, selectedTemplate } = req.body;

    // Insert a single record into the DiaryEntries table
    const diaryEntryInsertQuery = `
      INSERT INTO DiaryEntries (user_id, template_url)
      VALUES ($1, $2)
      RETURNING diary_entry_id
    `;
    const diaryEntryValues = [id, selectedTemplate.image]; // Assuming 'selectedTemplate.image' corresponds to 'template_url'
    const { rows } = await db.query(diaryEntryInsertQuery, diaryEntryValues);
    const diaryEntryId = rows[0].diary_entry_id;

    // Insert diary pages using the retrieved diary_entry_id
    for (const entry of diaryEntries) {
      const { title, content, pageNumber } = entry;

      const insertQuery = `
        INSERT INTO DiaryPages (diary_entry_id, page_number, title, content)
        VALUES ($1, $2, $3, $4)
      `;
      const values = [diaryEntryId, pageNumber, title, content];
      await db.query(insertQuery, values);
    }

    return res.status(200).json({
      success: true,
      message: "Diary page entries inserted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDiary = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT de.diary_entry_id, de.template_url, dp.title, dp.content
      FROM DiaryEntries de
      JOIN DiaryPages dp ON de.diary_entry_id = dp.diary_entry_id
      ORDER BY de.created_at DESC, dp.page_number ASC
    `);

    // Group the pages by diary_entry_id and concatenate content
    const diaryEntriesMap = {};
    result.rows.forEach((row) => {
      if (!diaryEntriesMap[row.diary_entry_id]) {
        diaryEntriesMap[row.diary_entry_id] = {
          diary_entry_id: row.diary_entry_id,
          template_url: row.template_url,
          title: row.title, // assuming the title is the same across pages for an entry
          content: "",
        };
      }
      diaryEntriesMap[row.diary_entry_id].content += row.content;
    });

    // Convert the map to an array
    const entries = Object.values(diaryEntriesMap);

    res.json(entries);
  } catch (err) {
    console.error("Error fetching diary entries:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBlogPosts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, title, content, created_at
      FROM blogs
      ORDER BY created_at DESC
    `);

    const blogPosts = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      created_at: row.created_at,
    }));

    res.json(blogPosts);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.postBlogPosts = async (req, res) => {
  const { title, content } = req.body;
  try {
    await pool.query(
      'INSERT INTO blogs (title, content) VALUES ($1, $2)',
      [title, content]
    );
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post', error);
    res.status(500).json({ error: 'Error creating post' });
  }
};