const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
     
});
