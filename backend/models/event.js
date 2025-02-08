/** Express router providing user related routes
 * @requires mongoose
*/
const mongoose = require('mongoose');

/**
 * Schema for Events 
 * @class
 * @property {String} - unique identifier for eventId created
 * @property {String} - name of event
 * @property {String} - description of the event created 
 * @property {Date} - start date of the event created
 * @property {Date} - end date time of the event created
 * @property {Number} - the duration of the event in minutes 
 * @property {Boolean} - if the event is currently active or in-active 
 * @property {String} - express static img containing a default image to be displayed if users do not enter an img
 * @property {Number} - the range of capacity an event can hold 
 * @property {Number} - number of tickets available 
 * @property {String} - list of category ID that link with the event ID 
 * @property {Array} - categoryList array that displays the attributes of the cateogory linked with the event
 */
const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'Description Not Provided'
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    durationInMinutes: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: '/event-banner.png'
    },
    capacity: {
        type: Number,
        default: 1000,
        validate: {
            validator: function (capacityValue) {
                return capacityValue >= 10 && capacityValue <= 2000;
            },
            message: 'Capacity should be a number between 10 and 2000 (inclusive)'
        }
    },
    ticketsAvailable: {
        type: Number,
    },
    categories: {
        type: String,
        required: true
    },
    categoryList: [{
        type: mongoose.Schema.ObjectId,     // list of category, which is an array of references (i.e. ids) to the 'Category' collection
        ref: 'Category'
    }]
});

module.exports = mongoose.model('Event', eventSchema);