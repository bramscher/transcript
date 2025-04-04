const express = require("express");
const cors = require("cors");
const { getTranscript } = require("youtube-captions-scraper");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const videoId = req.query.videoId;
  if (!videoId) return res.status(400).json({ error: "Missing videoId" });

  try {
    const transcript = await getTranscript({ videoID: videoId });
    res.json({ transcript });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get transcript", detail: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
