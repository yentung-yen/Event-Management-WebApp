const Event = require("../models/event");
const Category = require("../models/category");
const Operation = require("../models/operations");

/**
 * Generates the Event ID 
 * @function
 * @returns {string} - returns E, followed by 2 random characters and 3 random digits 
 */
function createEventID(){
    let min = 65        // A in ascii = 65
    let max = 90        // Z in ascii = 90

    // get a random ascii number
    let randAsciiFirst = Math.round(Math.random()*(max - min) + min);
    let randAsciiSecond = Math.round(Math.random()*(max - min) + min);
    
    // convert both ascii numbers into alphabet characters
    let randFirstChar = String.fromCharCode(randAsciiFirst);
    let randSecondChar = String.fromCharCode(randAsciiSecond);
    let randDigit = "";

    for (let i = 0; i < 4; i++) {
        // Get random number from 0 to 9
        let randNum = Math.floor(Math.random() * 10);
        // convert randNum to string
        let randNumInString = randNum.toString();

        // concatenates randNumInString
        randDigit += randNumInString
    }
    // return id
    return `E${randFirstChar}${randSecondChar}-${parseInt(randDigit)}`;
};

/**
 * Converts the start date time into a Date object, and then into a string formatted in a readable way.
 * @function
 * @param {string} startDateTime - start date time string obtained from frontend in 'DD-Mon-YYYY HH:MM:SS AM/PM' format.
 * @returns {string} - returns the start date time in 'Day Mon DD YYYY, HH:MM AM/PM' format. 
 */
function convertToDateObj(startDateTime){
    let dateObj = new Date(startDateTime);
    let dayDate = dateObj.toDateString();

    let hour = dateObj.getHours();
    if (hour > 12){
        hourFormat = hour - 12;
        timeOfDay = 'PM';
    // if 12 PM
    } else if (hour == 12) {
        hourFormat = hour;
        timeOfDay = 'PM';
    // if 12 AM
    } else if (hour == 0) {
        hourFormat = 12;
        timeOfDay = 'AM';
    }else {
        hourFormat = hour;
        timeOfDay = 'AM';
    }

    let minute = dateObj.getMinutes();
    if (minute < 10){
        minuteFormat = `0${minute}`;
    } else {
        minuteFormat = minute;
    }

    return `${dayDate}, ${hourFormat}:${minuteFormat} ${timeOfDay}`;
};

/**
 * Finds the end date time by adding duration in minutes to start date time.
 * @function
 * @param {string} startDateTime - start date time string obtained from frontend in 'DD-Mon-YYYY HH:MM:SS AM/PM' format.
 * @param {string} duration - duration of event in minutes obtained from frontend.
 * @returns {string} - returns the end date time in 'Day Mon DD YYYY, HH:MM AM/PM' format. 
 */
function findEndDateTime(startDateTime, duration){
    let start = new Date(startDateTime);
    let end = start.setMinutes(start.getMinutes() + Number(duration));
    let endTimestamp = new Date(end);

    let endHour = endTimestamp.getHours();
    if (endHour > 12){
        hourFormat = endHour - 12;
        timeOfDay = 'PM';
    // if 12 PM
    } else if (endHour == 12) {
        hourFormat = endHour;
        timeOfDay = 'PM';
    // if 12 AM
    } else if (endHour == 0) {
        hourFormat = 12;
        timeOfDay = 'AM';
    }else {
        hourFormat = endHour;
        timeOfDay = 'AM';
    }

    let endMinute = endTimestamp.getMinutes();
    if (endMinute < 10){
        minuteFormat = `0${endMinute}`;
    } else {
        minuteFormat = endMinute;
    }

    let endDateTime = `${hourFormat}:${minuteFormat} ${timeOfDay}`;
    let dayDate = endTimestamp.toDateString();

    return `${dayDate}, ${endDateTime}`;
};

// endpoints
module.exports = {
    // insert new event

/**
 * RESTful API endpoint which sends data in JSON format of new event created 
 * @name createNewEvent
 * @async
 * @function 
 * @param {Object}  - expresses the new created event 
 * @return {Promise<String>} - returns the newly created event by its event ID 
 */
    createNewEvent: async function (req, res) {
        try{
            let id = createEventID()
            let eventName = req.body.name;
            let eventDesc = req.body.description;
            let start = convertToDateObj(req.body.startDateTime);
            let duration = Number(req.body.durationInMinutes);
            let end = findEndDateTime(start, duration); 
            let isActiveDet = req.body.isActive
            let imageDet = req.body.image;
            let capacityDet = req.body.capacity;
            let ticketsAvailableDet = req.body.ticketsAvailable;
            let catIds = req.body.categories;      

            let anEvent = new Event({ 
                eventId: id, 
                name: eventName, 
                description: eventDesc, 
                startDateTime: start, 
                endDateTime: end,
                durationInMinutes: duration,
                isActive: isActiveDet,
                image: imageDet,
                capacity: capacityDet,
                ticketsAvailable: ticketsAvailableDet,
                categories: catIds
            });
            await anEvent.save();

            //add event id of new event to 'eventList' array for all categories in this event
            let categoryList = catIds.split(',');

            for (let i = 0; i < categoryList.length; i++) {
                categoryId = categoryList[i];
                theCategory = await Category.findOne({ catId: categoryId });
                
                // the catId list could contain categories that exist and categories that don't exist
                if (theCategory == null){
                    // if no category was found (ie cat doesn't exist), pass and no need to update 'eventList' array
                } else {    
                    // else if cat exist, update eventList
                    theCategory.eventList.push(anEvent._id);
                    await theCategory.save();
                }
            }

            //add categories listed to categoryList
            for (let i = 0; i < categoryList.length; i++) {

                // step 1: get mongoose id of category
                categoryId = categoryList[i];
                theCategory = await Category.findOne({ catId: categoryId });

                // the catId list could contain categories that exist and categories that don't exist
                if (theCategory == null) {
                    // if no category was found, pass and no need to update 'categoryList' array
                } else {
                    // step 2: find the event we want to add the catId to 
                    theEvent = await Event.findOne({ eventId: id });

                    // step 3: add mongoose id of category to categoryList in event
                    theEvent.categoryList.push(theCategory._id);
                    await theEvent.save();
                }
            }

            // add 1 to records created in operation
            let statsData = await Operation.find({});
            let oldRecordsCreatedNum = statsData[0].recordsCreatedNum;
            let newNum = oldRecordsCreatedNum + 1;

            theUpdate = {
                $set: { recordsCreatedNum: newNum }
            };
            await Operation.updateMany({}, theUpdate);

            res.status(200).json({ "eventId": anEvent.eventId });

        } catch (error) {
            res.status(400).json({error:"Invalid Data"});
        }
	},

    /**
 * RESTful API endpoint which gets all event data in JSON format 
 * @name listAllEvents
 * @async
 * @function 
 * @param {Object}  - finds all the events including the categoryList array 
 * @return {Promise<String>} - returns the list of all events 
 */
    // list all events
    listAllEvents: async function (req, res) {
		let allEvents = await Event.find({}).populate('categoryList').exec();
		res.status(200).json(allEvents);
	},

    // delete event by id
/**
 * RESTful API endpoint which deleted event by its ID
 * @name deleteById
 * @async
 * @function 
 * @param {Object}  - deletes events by its ID and deletes the event in the eventList array 
 * @return {Promise<String>} - returns acknowledge if the operation of delete occurred 
 */
    deleteById: async function (req, res) {
        try {
            let delEventId = req.params.eventId;

            // deleted event must be removed from the 'eventsList' array in all the categories that are listed in the 'categoryList'
            // get the event
            let event = await Event.find({ eventId: delEventId }).populate('categoryList').exec();
            let eventObj = event[0];

            // step 1: find the mongoose ids of the categories listed in 'categoryList'
            let catToDeleteFrom = eventObj.categoryList;         // get list of categories to delete the event from

            // step 2: find the mongoose id of the event we want to delete
            // get Mongoose id of event
            let eventObjNoPopulate = await Event.find({ eventId: delEventId });
            let eventMongooseId = eventObjNoPopulate[0].id;
            
            // step 3: delete that event from the 'eventsList' array
            for (let i = 0; i < catToDeleteFrom.length; i++) {

                //find category object
                catMongooseId = catToDeleteFrom[i]._id;
                theCategory = await Category.findById(catMongooseId);

                // delete event from category
                theCategory.eventList.pull(eventMongooseId);
                await theCategory.save();
            }

            // step 4: finally, delete the event
            let obj = await Event.deleteOne({ eventId: delEventId });

            // add 1 to records deleted in operation
            let statsData = await Operation.find({});
            let oldRecordsDeletedNum = statsData[0].recordsDeletedNum;
            let newNum = oldRecordsDeletedNum + 1;

            theUpdate = {
                $set: { recordsDeletedNum: newNum }
            };
            await Operation.updateMany({}, theUpdate);

            res.json(obj);

        } catch (error) {
            res.status(400).json({error:"Invalid Data"});
        }
	},

    // Update event name and capacity by ID
/**
 * RESTful API endpoint which updates the event name and capacity by ID
 * @name updateById
 * @async
 * @function 
 * @param {Object}  - updates the event name and capacity by its event ID
 * @return {Promise<String>} - returns the event object (before its updated) that was updated if update worked or error message if update did not occur 
 */
    updateById: async function (req, res) {
        try{
            let updateId = req.body.eventId;
            let newName = req.body.name;
            let newCapacity = req.body.capacity;

            // calculate new tickets available value
            let event = await Event.find({ eventId: updateId });

            // if the event exists and is found (i.e event != [] -> event is not an empty array)
            if (event.length != 0) {
                oldCapacity = event[0].capacity;    // event is a list. the event object is the first item of the list -> event[0]
                capacityChange = newCapacity - oldCapacity;
                updateTicketsAvailable = event[0].ticketsAvailable + capacityChange

                // add 1 to records updated in operation =======
                const statsData = await Operation.find({});
                let oldRecordsUpdatedNum = statsData[0].recordsUpdatedNum;
                let newNum = oldRecordsUpdatedNum + 1;

                theUpdate = {
                    $set: { recordsUpdatedNum: newNum }
                };
                await Operation.updateMany({}, theUpdate);
                // =============================================
                
                if (updateTicketsAvailable < 0) {
                    updateTicketsAvailable = 0          // if tickets available became negative, set to 0
                }

                theUpdate = {
                    $set: { name: newName, capacity: newCapacity, ticketsAvailable: updateTicketsAvailable }
                };
            } else {    // if no event found 
                theUpdate = {
                    $set: { name: newName, capacity: newCapacity }
                };
            }
            
            // update event
            // Update validators are off by default unless findByIdAndUpdate used - need to specify { runValidators: true }
            let obj = await Event.findOneAndUpdate({ eventId: updateId }, theUpdate, { runValidators: true });
            
            if (obj == null){
                res.status(400).json({"error":"Invalid Event Id - event not found"});
            } else {
                res.json(obj);
            }

        } catch (error) {
            res.status(400).json({error:"Invalid Data"});
        }
	},

    // task 1.4. display event data
/**
 * RESTful API endpoint which gets all the data of a single event to display it
 * @name displayEvent
 * @async
 * @function 
 * @param {Object}  - gets the event object by its event ID
 * @return {Promise<String>} - returns the event object 
 */
    displayEvent: async function (req, res) {
        let displayEventId = req.params.eventId;

        let event = await Event.find({ eventId: displayEventId });
        res.status(200).json(event);
    }
};
