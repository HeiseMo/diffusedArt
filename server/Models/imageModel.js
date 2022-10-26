const mongoose = require("mongoose");
const ImageShema = mongoose.Schema({
  prompt: {
    type: String,
  },
  negativePrompt: {
    type: String,
  },
  steps: {
    type: String,
  },
  cfg: {
    type: String,
  },
  size: {
    type: String,
  },
  sampler: {
    type: String,
  },
  seed: {
    type: String,
  },
  location: {
    type: String,
  },
});

const Image = mongoose.model("Image", ImageShema);
module.exports = Image;

