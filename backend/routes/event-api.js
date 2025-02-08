const express = require("express");
const eventCont = require("../controllers/event-controller");

const router = express.Router();

// API endpoints
/**
 * Route serving to add events api
 * @name post 
 * @function
 * @param {string} path - path for which the post request is invoked on.
 * @param {Function} callback - callback function to process request.
 */
router.post("/add-event", eventCont.createNewEvent);

/**
 * Route serving to list events api
 * @name get 
 * @function
 * @param {string} path - path for which the get request is invoked on.
 * @param {Function} callback - callback function to process request.
 */
router.get("/events", eventCont.listAllEvents);

/**
 * Route serving to delete events api
 * @name delete 
 * @function
 * @param {string} path - path for which the delete request is invoked on.
 * @param {Function} callback - callback function to process request.
 */
router.delete("/delete-event/:eventId", eventCont.deleteById);

/**
 * Route serving to update events api
 * @name put 
 * @function
 * @param {string} path - path for which the update request is invoked on.
 * @param {Function} callback - callback function to process request.
 */
router.put("/update-event", eventCont.updateById);

/**
 * Route serving to display events api
 * @name get 
 * @function
 * @param {string} path - path for which the get request is invoked on.
 * @param {Function} callback - callback function to process request.
 */
router.get("/events/:eventId", eventCont.displayEvent);

module.exports = router;