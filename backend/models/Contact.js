const mongoose = require("mongoose");
const Joi = require("joi");

const ContactSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: [true, "Full Name is required."],
  },
  Age: {
    type: Number,
    required: [true, "Age is required."],
    min: 1,
    max: 100,
  },
  Address: {
    type: String,
    required: [true, "Address is required."],
  },
  DateOfBirth: {
    type: Date,
    required: [true, "Date of Birth is required."],
  },
  JoiningDate: {
    type: Date,
    required: [true, "Joining Date is required."],
  },
  Salary: {
    type: Number,
    required: [true, "Salary is required."],
  },
  Department: {
    type: String,
    required: [true, "Department is required."],
    enum: ["Production", "Marketing & Sales", "Finance", "Human resource", "Information Technology"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Contact = new mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {
  const schema = Joi.object({
    FullName: Joi.string().min(4).max(50).required(),
    Age: Joi.number().integer().min(1).max(100).required(),
    Address: Joi.string().min(4).max(100).required(),
    DateOfBirth: Joi.date().required(),
    JoiningDate: Joi.date().required(),
    Salary: Joi.number().required(),
    Department: Joi.string().valid("Production", "Marketing & Sales", "Finance", "Human resource", "Information Technology").required(),
    phone: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateContact,
  Contact,
};
