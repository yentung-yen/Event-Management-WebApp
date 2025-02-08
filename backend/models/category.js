/** Express router providing user related routes
 * @requires mongoose
*/

const mongoose = require('mongoose');

/**
 * Category Schema 
 * @class
 * @property {String} - unique identifier for category created
 * @property {String} - name of category
 * @property {String} - description of the category
 * @property {String} - express static img containing a default image to be displayed if users do not enter an img
 * @property {String} - date and time of when the category is created 
 * @property {Array} - an array containing events that link with an category ID 
 */
const categorySchema = new mongoose.Schema({
    catId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        //match is a built in validator
        match: /^[A-Za-z0-9\s]+$/, //regular expression that accepst alphanumeric values + spaces 
    },
    description: {
        type: String, 
        default: "Description Not Provided"
    },
    image: {
        type: String,
        default: '/default-img.png'
    },
    createdAt: {
        type: String,  // need to fix to make Date type 
    },
    eventList: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    }]
});


module.exports = mongoose.model('Category', categorySchema);

