const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [String], default: [] }, // Only for dropdown type fields
  required: { type: Boolean, default: false },
});

const formSchema = new mongoose.Schema(
  {
    formName: { type: String, required: true },
    description: { type: String, required: true },
    fields: { type: [fieldSchema], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Form', formSchema);
