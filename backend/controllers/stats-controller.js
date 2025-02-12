const Category = require("../models/category");
const Event = require("../models/event")

module.exports = {
    getAllCatAndEvents: async function (req,res){
        // get all categories
        let categories = await Category.find().exec()
        totalCat = categories.length;
    
        // get all events
        let events = await Event.find().exec();
        totalEvent = events.length;
    
        res.status(200).json({ categories:totalCat, events:totalEvent });
    }
}