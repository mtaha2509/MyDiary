const db = require("../db");
const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");

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
    console.log("User ID:", id);
    console.log("User Email:", email);

    const { diaryEntries, selectedTemplate } = req.body;

    const diaryEntryInsertQuery = `
      INSERT INTO DiaryEntries (user_id, template_url)
      VALUES ($1, $2)
      RETURNING diary_entry_id
    `;
    const diaryEntryValues = [id, selectedTemplate.image];
    const { rows } = await db.query(diaryEntryInsertQuery, diaryEntryValues);
    const diaryEntryId = rows[0].diary_entry_id;

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

exports.timecapsule = async (req, res) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decodedPayload = verifyToken(token);
    if (!decodedPayload) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const id=decodedPayload.id;
    const { overview, messageToFutureSelf, uploadedImage } = req.body;

    const timeCapsuleinsertQuery = 'INSERT INTO TimeCapsule (user_id,timecapsule_id, title, message_to_future_self, image_url) VALUES ($1,$2, $3, $4, $5)';
    const timeCapsuleValues = [id, overview, messageToFutureSelf, uploadedImage];

    await db.query(timeCapsuleinsertQuery, timeCapsuleValues);

    return res.status(200).json({
      success: true,
      message: "Time Capsule entry inserted successfully",
    });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}