const Form = require('../models/formData');

// Save a new form
exports.saveForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json({ message: 'Form saved successfully', form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving form', error });
  }
};

// Retrieve all forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching forms', error });
  }
};

// Retrieve a single form by its ID
exports.getFormById = async (req, res) => {
    try {
      const formId = req.params.id; // Get the form ID from the request parameters
      const form = await Form.findById(formId); // Find form by ID
  
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      res.status(200).json(form); // Return the form data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching form', error });
    }
  };
  
