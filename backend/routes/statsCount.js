const express = require("express");
const statsCount = require("../controllers/stats-controller");

const router = express.Router();

/**
 * Route serving to get Operation Counters
 * @name get 
 * @function
 * @param {string} path - path for which the get request is invoked on.
 * @param {Function} callback - callback function to process request.
 */
router.get("/get-stats", statsCount.getAllCatAndEvents);

module.exports = router;