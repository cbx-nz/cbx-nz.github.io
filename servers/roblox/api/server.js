// Install express: npm install express
const express = require("express");
const app = express();

app.get("/time", (req, res) => {
  const currentTime = new Date();
  res.json({ time: currentTime.toISOString() });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Time API running on http://localhost:${PORT}`));