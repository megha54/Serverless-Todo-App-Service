const itemService = require('../services/itemService');
// Delete an item
module.exports.delete = async (event) => {
    const itemId = event.pathParameters.id;
    await itemService.deleteItem(itemId);
    return { statusCode: 200, body: JSON.stringify({ message: 'Item deleted' }) };
  };