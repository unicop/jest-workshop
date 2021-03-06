const mongoose = require("mongoose");
const { workshopDbClose } = require("../shared/db-setup");
const { sum } = require("../pure-logic-example/calculator");
const { getConnectionModel } = require("../shared/model");

/**
 * 
 * @param {mongoose.Connect} connection 
 * @returns 
 */
async function saveCalculation(connection, action, numA, numB) {
    try {
        const { Calculation } = await getConnectionModel(connection);

        const result = await Calculation.create({
            actionName: sum.name,
            action: `${action.name}(${numA}, ${numB})`,
            result: action(numA, numB),
            _createdAt: new Date(),
        })

        return result;

    } catch (e) {
        console.error(e);
    } finally {
        workshopDbClose();
    }

}


// saveCalculation();

module.exports = {
    saveCalculation,
}
