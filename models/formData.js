/*const mongoose = require('mongoose');

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

module.exports = mongoose.model('Form', formSchema);*/

const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique ID for the field
  label: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["Text", "Number", "Checkbox", "Dropdown", "Conditional", "Media", "Location"], 
    required: true 
  },
  options: { type: [String], default: [] }, // For Dropdown type
  required: { type: Boolean, default: false }, // Whether the field is mandatory
  mediaRequired: { type: Boolean, default: false }, // Media file support
  locationRequired: { type: Boolean, default: false }, // Location coordinates support
  conditionalLogicOptions: {
    type: [
      {
        label: { type: String, enum: ["Yes", "No"], required: true }, // 'Yes' or 'No'
        value: { type: Boolean, default: false }, // Condition state
        followUpQuestion: { type: String, default: "" }, // Optional follow-up question
      }
    ],
    default: [],
  },
});

const formSchema = new mongoose.Schema(
  {
    formId: { type: String, required: true }, // Unique ID for the form
    formName: { type: String, required: true },
    description: { type: String, required: true },
    fields: { type: [fieldSchema], required: true }, // Array of fields
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Form', formSchema);

