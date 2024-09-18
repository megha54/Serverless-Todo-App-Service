const itemService = require('../services/itemService');
// Update an item
module.exports.update = async (event) => {
    const itemId = event.pathParameters.id;
    const data = JSON.parse(event.body);
    const updatedItem = await itemService.updateItem(itemId, data);
    return { statusCode: 200, body: JSON.stringify(updatedItem) };
  };