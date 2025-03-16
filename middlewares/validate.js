const Joi = require("joi");

const validateproduct = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  shortdescription: Joi.string().required().messages({
    "string.empty": "Short Description is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  price: Joi.number().min(1).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price can't be less than 1",
    "any.required": "Price is required",
  }),
  stock: Joi.number().min(1).required().messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock can't be less than 1",
    "any.required": "Stock is required",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  measurementtype: Joi.string().required().messages({
    "string.empty": "Measurement Type is required",
  }),
  measurement: Joi.string().required().messages({
    "string.empty": "Measurement is required",
  }),
  tags: Joi.any().required().messages({
    "any.required": "Tags are required",
  }),
  properties: Joi.any().required().messages({
    "any.required": "Properties are required",
  }),
});
const validateuser = Joi.object({
  firstname: Joi.string().required().messages({
    "string.empty": "First Name is required",
  }),
  lastname: Joi.string().required().messages({
    "string.empty": "Last Name is required",
  }),
  email: Joi.string().required().messages({
    "string.empty": "Email Address is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
  confirmpassword: Joi.string().required().messages({
    "string.empty": "Confirm Password is required",
  }),
});


const validatelogin = Joi.object({

  email: Joi.string().required().messages({
    "string.empty": "Email Address is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
module.exports = { validateproduct, validateuser, validatelogin};
