const mongoose = require('mongoose');
const Joi = require('joi');


const Customer = mongoose.model('Customers', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 4, 
      maxlength: 30
    },
    phone: {
        type: Number, 
        required: true, 
        minlength: 4,
        maxlength: 30
    },
    isGold: {
        type: Boolean,
        default: false
    }
  }));

  
function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone: Joi.string().min(3).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
  }

  exports.validateCustomer = validateCustomer;
  exports.Customer = Customer;
