const Category = require("../models/category");
const Event = require("../models/event")
const Operation = require("../models/operations");


/**
 * Generates the category ID 
 * @function
 * @param {Function} - generates the category ID 
 * @returns {string} - returns 3 random characters and 3 random digits 
 */
function createCatID(){
    let min = 65        
    let max = 90        

    let randAsciiFirst = Math.round(Math.random()*(max - min) + min);
    let randAsciiSecond = Math.round(Math.random()*(max - min) + min);
    
    let randFirstChar = String.fromCharCode(randAsciiFirst);
    let randSecondChar = String.fromCharCode(randAsciiSecond);
    let randDigit = "";

    for (let i = 0; i < 4; i++) {
        let randNum = Math.floor(Math.random() * 10);
        let randNumInString = randNum.toString();

        randDigit += randNumInString
    }
    return `C${randFirstChar}${randSecondChar}-${parseInt(randDigit)}`;
};


/**
 * Generates the date and time the category is created
 * @function
 * @param {Function} - generates the current date and time of the created category in the date and time format
 * @return {string}  - reuturns the current date and time 
 */
function catCreatedAt(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let hr = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let ampm = hr >= 12 ? 'PM' : 'AM';
    
    hr = hr % 12;
    hr = hr ? hr : 12;
    
    return (`${dd}/${mm}/${yyyy}, ${hr}:${min}:${sec} ${ampm}`);


};


//===========================================================================================
//RESTFUL API endpoints 
module.exports = {

    // Inserting new Category 
/**
 * RESTful API endpoint which sends data in JSON format of new category created 
 * @name createCategory
 * @async
 * @function 
 * @param {Object}  - expresses the new created category 
 * @return {Promise<String>} - returns the new created category or error if validations are not met 
 */
    createCategory: async function (req, res) {
        try{
            let id = createCatID();
            let catName = req.body.name;
            let catDesc = req.body.description;
            let catImg = req.body.image;
            let createAtTime = catCreatedAt();
            let newCategory = new Category({ 
                catId: id,
                name: catName, 
                description: catDesc, 
                image: catImg,
                createdAt: createAtTime 
            });
            await newCategory.save();

            // add 1 to records created in operation
            let statsData = await Operation.find({});
            let oldRecordsCreatedNum = statsData[0].recordsCreatedNum;
            let newNum = oldRecordsCreatedNum + 1;

            theUpdate = {
                $set: { recordsCreatedNum: newNum }
            };
            await Operation.updateMany({}, theUpdate);

            res.status(200).json({"id": newCategory.catId})
            } catch (err) {
                res.status(400).json({error: "Invalid Data"} );	
        }
    },


/**
 * RESTful API endpoint which sends data in JSON format of new category created 
 * @name getAll
 * @async
 * @function 
 * @param {Object}  - finds the categories created contain the array of event list that link to the category ID
 * @return {Promise<String>} - returns the list of categories 
 */
    getAll: async function (req, res) {
        let category = await Category.find().populate("eventList");
        res.status(200).json(category);
	}, 


/**
 * RESTful API endpoint which sends data in JSON format of new category created 
 * @name deleteCategory
 * @async
 * @function 
 * @param {Object}  - finds the category and deletes it and finds the category ID in the category list and deletes it there
 * @return {Promise<String>} - returns the JSON object acknowledging if category was deleted and the count 
 */
    deleteCategory: async function (req, res) {
     
        let id = req.params.catId;
        console.log(req.body.catId)
        let catObj = await Category.findOne({catId: id});
        console.log(catObj);
        let newObj = await Event.find({ categoryList: catObj._id });
        for (let i = 0; i < newObj.length; i++) {
            categoriesId = newObj[i].categories 
            // Split - turns into an array which splits each elements in the array by the comma
            // Map - transform the element into an array 
            // Trim - removes whitespaces 
            let parts = categoriesId.split(',').map(part => part.trim());

            // Use filter to remove the specified value.
            //find the ones that do not match the req.body.id and keeps it in
            const filteredParts = parts.filter(part => part !== req.body.id);

            // Join the filtered parts back together with a comma.
            // join > removes an array and between each element it adds a comma
            const finalResult = filteredParts.join(', ');

            console.log(finalResult); 
            await newObj[i].updateOne({ categories: finalResult });

            newObj[i].categoryList.remove(catObj._id)
            await newObj[i].save()
    
        }
        let obj = await Category.deleteOne({catId: id});

        // add 1 to records deleted in operation
        let statsData = await Operation.find({});
        let oldRecordsDeletedNum = statsData[0].recordsDeletedNum;
        let newNum = oldRecordsDeletedNum + 1;

        theUpdate = {
            $set: { recordsDeletedNum: newNum }
        };
        await Operation.updateMany({}, theUpdate);

        res.json({
            "acknowledged": true,
            "deletedCount": 1
        });
           

    },


/**
 * RESTful API endpoint which sends data in JSON format of new category created 
 * @name deleteCategory
 * @async
 * @function 
 * @param {Object}  - finds the category to update by it's ID and updates name and description 
 * @return {Promise<String>} - returns the JSON object whether update was successful or not 
 */
    updateOne: async function (req, res) {
        try {
        let aCategory = req.body;
      
        const updatedCategory = await Category.findOneAndUpdate(
            {
                catId: aCategory.catId, //catId refers to the schema, id refers to the body
            },
            
            {
                $set: {
                    name: aCategory.name,
                    description: aCategory.description,
                },
            }
        );

        if (updatedCategory){
            // add 1 to records updated in operation
            const statsData = await Operation.find({});
            let oldRecordsUpdatedNum = statsData[0].recordsUpdatedNum;
            let newNum = oldRecordsUpdatedNum + 1;

            theUpdate = {
                $set: { recordsUpdatedNum: newNum }
            };
            await Operation.updateMany({}, theUpdate);

            res.status(200).json({"Status": "Update Successful"})
            
        } else {
            res.status(404).json({"Status": "ID not found"})
        };
    } catch (error) {
        res.status(400).json({error:"Invalid Data"});
    }
    
    },


    //Display category: 
    displayCategory: async function (req, res){
        let viewCatId = req.params.catId;
        let category = await Category.find({catId: viewCatId});
        res.status(200).json(category); 
    }
    
}



    