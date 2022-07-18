const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");
let storage = multer.diskStorage({
  destination: (res, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});
let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("myfile");
router.post("/files", async (req, res) => {
  upload(req, res, async (err) => {
    if (!req.files) {
      res.json({ error: "required Files" });
    }
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    }
    const file = await File.create({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    console.log(file);
    res.status(200).json({
      file: `${process.env.base_url}/files/${file.uuid}`,
    });
  });
});

module.exports = router;
