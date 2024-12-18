const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  formId: { type: String, required: true },
  formName: { type: String, required: true },
  fields: [
    {
      id: { type: String, required: true },
      label: { type: String, required: true },
      type: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed, required: true }, // Can hold text, number, dropdown options
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);
