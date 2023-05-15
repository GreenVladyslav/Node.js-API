const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// {timestamps: true}  дата которая будет автоматически присваеватся к созданому посту

const Contact = mongoose.model('Contact', contactShema);

module.exports = Contact;
