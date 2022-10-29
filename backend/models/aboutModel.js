const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    title: String,
    description: String,
  })
  
const AboutMe = mongoose.model("aboutme", aboutSchema);

module.exports = AboutMe