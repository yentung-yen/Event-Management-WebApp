/** Express router providing user related routes
 * @requires mongoose
*/
const mongoose = require('mongoose');

/**
 * Operations Schema 
 * @class
 * @property {Number} - count of the number of category and event records added 
 * @property {Number} - count of the number of category and event records deleted 
 * @property {Nunber} - counts the number of category and event records updated 
 * 
 */
const operationSchema = new mongoose.Schema({
    recordsCreatedNum: {
        type: Number,
        default: 0
    },

    recordsDeletedNum: {
        type: Number,
        default: 0
    },

    recordsUpdatedNum: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Operation', operationSchema);