const mongoose = require("mongoose");

const paragraphSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "Untitled Paragraph"
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Paragraph", paragraphSchema);
