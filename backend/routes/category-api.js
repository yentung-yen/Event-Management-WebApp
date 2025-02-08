//endpoints - designed to receive in json format and send data abck in json format
const express = require("express");
const categoryCont = require("../controllers/category-controller");

const router = express.Router();

// API endpoints 
/**
 * API Routes - create new Category 
 * @name POST 
 * @function
 */
router.post("/add-category", categoryCont.createCategory); 
/**
 * API Routes - list created categories 
 * @name get 
 * @function
 */
router.get("/list-category", categoryCont.getAll);
/**
 * API Routes - deletes categories 
 * @name delete 
 * @function
 */
router.delete("/delete-category/:catId", categoryCont.deleteCategory);
/**
 * API Routes - updates categories
 * @name put 
 * @function
 */
router.put("/update-category", categoryCont.updateOne)
/**
 * Route serving to display category api
 * @name get 
 * @function
 * @param {string} path - path for which the get request is invoked on.
 * @param {Function} callback - callback function to process request.
 */
router.get("/category/:catId", categoryCont.displayCategory);


module.exports = router;