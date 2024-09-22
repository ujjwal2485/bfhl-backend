const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse JSON
app.use(bodyParser.json());

// POST /bfhl route
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;
  const fullName = "john_doe"; 
  const dob = "17091999";      
  const email = "john@xyz.com"; 
  const rollNumber = "ABCD123"; 

  // Filter numbers and alphabets
  const numbers = data.filter((val) => !isNaN(val));
  const alphabets = data.filter((val) => isNaN(val));

  // Find the highest lowercase alphabet
  const lowerAlphabets = alphabets.filter(
    (char) => char >= "a" && char <= "z"
  );
  const highestLowercaseAlphabet = lowerAlphabets.length
    ? [lowerAlphabets.sort().reverse()[0]]
    : [];

  // File validation
  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKb = null;

  if (file_b64) {
    try {
      const fileBuffer = Buffer.from(file_b64, "base64");
      fileSizeKb = fileBuffer.length / 1024;
      fileMimeType = "image/png"; // You can replace this with dynamic MIME type detection
      fileValid = true;
    } catch (error) {
      fileValid = false;
    }
  }

  // Response
  res.json({
    is_success: true,
    user_id: `${fullName}_${dob}`,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  });
});

// GET /bfhl route
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Set the port for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
