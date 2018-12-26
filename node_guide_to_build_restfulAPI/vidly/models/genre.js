const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genres', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4, 
    maxlength: 30
  }
}))


function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

  
  exports.validateGenre = validateGenre; 
  exports.Genre = Genre;