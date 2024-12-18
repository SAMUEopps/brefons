const Form = require('../models/form'); // Form design model
const FormSubmission = require('../models/formSubmission'); // Form submission model

const saveFormSubmission = async (req, res) => {
  try {
    const { formId, fields } = req.body;

    // Validate input
    if (!formId || !fields || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Fetch the form details from the design database
    const form = await Form.findOne({ formId });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Construct the fields for submission, ensuring labels and types are included
    const submissionFields = fields.map((field) => {
      const formField = form.fields.find((f) => f.id === field.id);
      if (!formField) {
        throw new Error(`Field with ID ${field.id} is not defined in the form design`);
      }

      return {
        id: field.id,
        label: formField.label,
        type: formField.type,
        value: field.value,
      };
    });

    // Create a new form submission
    const newSubmission = new FormSubmission({
      formId: form.formId,
      formName: form.formName,
      fields: submissionFields,
    });

    // Save the submission to the database
    const savedSubmission = await newSubmission.save();

    res.status(201).json({ message: 'Form submission saved successfully', data: savedSubmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { saveFormSubmission };
