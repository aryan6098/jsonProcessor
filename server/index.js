const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8200;

app.use(cors());
app.use(express.json());

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// POST: Process input
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input" });
    }

    let numbers = [];
    let alphabets = [];

    data.forEach((item) => {
      if (!isNaN(item)) numbers.push(item);
      else if (typeof item === "string" && item.match(/^[a-zA-Z]$/))
        alphabets.push(item);
    });

    // Determine the highest alphabet
    const highestAlphabet = alphabets.length
      ? [alphabets.sort((a, b) => b.localeCompare(a))[0]]
      : [];

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

// GET: Return operation_code
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
