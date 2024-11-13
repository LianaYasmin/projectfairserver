//importmongoose
const mongoose = require('mongoose')

//schema
const projectSchema = new mongoose.Schema({
  title:{
    required:true,
    type:String
  },
  language:{
    required:true,
    type:String
  },
  github:{
    required:true,
    type:String
  },
  Website:{
    required:true,
    type:String
  },
  overview:{
    required:true,
    type:String
  },
  projectImage:{
    required:true,
    type:String
  },
  userId:{
    required:true,
    type:String
  }
  
})


//model
const projects = mongoose.model('projects',projectSchema)

module.exports = projects