const Operation = require("../models/operations");

// endpoints
module.exports = {
/**
 * RESTful API endpoint which gets the operation counters data
 * @name opsPage
 * @async
 * @function 
 * @param {Object}  - creates a new object to store operation counter data if it doesn't exist. Else, it gets the operation counters data.
 * @return {Promise<String>} - returns the operation counter object 
 */
    opsPage: async function (req, res) {
        let statData = await Operation.find({})
        let statNum = statData.length

        // if there isn't already an existing document, create one
        // we want to make sure that we only have one document in the operations collection
        if (statNum == 0){
            let operationStat = new Operation({ 
                recordsCreatedNum: 0, 
                recordsDeletedNum: 0, 
                recordsUpdatedNum: 0, 
            });
            await operationStat.save()

            statData = await Operation.find({})
        }

        // get stats
        let stats = statData[0]

        res.json({ 
            recCreated: stats.recordsCreatedNum,
            recDeleted: stats.recordsDeletedNum,
            recUpdated: stats.recordsUpdatedNum,
          });
    },
};
