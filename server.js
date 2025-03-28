const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from the current directory

// Endpoint to save questions to data.txt
app.post('/api/save-question', (req, res) => {
  const questionData = req.body;

  // Format the question to append to the file
  const formattedQuestion = `Question: ${questionData.question}\nTimestamp: ${new Date().toISOString()}\n\n`;

  // Append the question to data.txt
  const filePath = path.join(__dirname, 'data.txt');
  fs.appendFile(filePath, formattedQuestion, (err) => {
    if (err) {
      console.error('Error writing to data.txt:', err);
      return res.status(500).json({ success: false, error: 'Failed to save question' });
    }
    res.json({ success: true });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});