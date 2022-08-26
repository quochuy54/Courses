const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const Course = new Schema({
  name: {type: String, maxlength: 255},
  description: {type: String, maxlength: 20000},
  image: {type: String, maxlength: 255},
  level: {type: String, maxlength: 255},
  videoId: {type: String},
  slug: {type: String, maxlength: 255, slug: 'name', unique: true},
},  {timestamps: true}
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
  deletedAt : true,
  overrideMethods: 'all' 
});

module.exports = mongoose.model('Course', Course);
