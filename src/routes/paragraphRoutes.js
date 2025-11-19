const express = require("express");
const Paragraph = require("../models/Paragraph");

const router = express.Router();

/**
 * @route   POST /api/paragraphs
 * @desc    Insert a new paragraph (text in paragraph)
 * @body    { title?: string, content: string }
 */
router.post("/", async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Content is required and must be a non-empty string"
      });
    }

    const paragraph = await Paragraph.create({
      title: title || "Untitled Paragraph",
      content: content.trim()
    });

    res.status(201).json({
      success: true,
      data: paragraph
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/paragraphs
 * @desc    Get all paragraphs
 */
router.get("/", async (req, res, next) => {
  try {
    const paragraphs = await Paragraph.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: paragraphs.length,
      data: paragraphs
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/paragraphs/:id
 * @desc    Get a single paragraph by ID
 */
router.get("/:id", async (req, res, next) => {
  try {
    const paragraph = await Paragraph.findById(req.params.id);
    if (!paragraph) {
      return res.status(404).json({
        success: false,
        message: "Paragraph not found"
      });
    }
    res.json({
      success: true,
      data: paragraph
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/paragraphs/:id
 * @desc    Update an existing paragraph (text update)
 * @body    { title?: string, content?: string }
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const updateData = {};
    if (typeof title === "string") updateData.title = title;
    if (typeof content === "string") updateData.content = content;

    const paragraph = await Paragraph.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!paragraph) {
      return res.status(404).json({
        success: false,
        message: "Paragraph not found"
      });
    }

    res.json({
      success: true,
      data: paragraph
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/paragraphs/:id
 * @desc    Delete a paragraph
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const paragraph = await Paragraph.findByIdAndDelete(req.params.id);

    if (!paragraph) {
      return res.status(404).json({
        success: false,
        message: "Paragraph not found"
      });
    }

    res.json({
      success: true,
      message: "Paragraph deleted successfully"
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
