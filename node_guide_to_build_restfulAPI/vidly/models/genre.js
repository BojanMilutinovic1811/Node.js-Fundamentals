const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4, 
    maxlength: 30
  }
})

const Genre = mongoose.model('Genres', genreSchema )


function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

  
  exports.validateGenre = validateGenre; 
  exports.Genre = Genre;
  exports.genreSchema = genreSchema;