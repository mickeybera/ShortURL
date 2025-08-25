import express from "express";
import shortid from "shortid";
import Url from "../models/Url.js";

const router = express.Router();

// Create short URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) return res.status(400).json({ message: "URL is required" });

  try {
    let url = await Url.findOne({ originalUrl });
    if (!url) {
      const shortCode = shortid.generate();
      url = new Url({ originalUrl, shortCode });
      await url.save();
    }
    res.json({ shortUrl: `${process.env.BASE_URL}/${url.shortCode}` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

