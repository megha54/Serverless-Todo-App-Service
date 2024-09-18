const itemService = require('../services/itemService');
// Get an item
module.exports.get = async (event) => {
    const itemId = event.pathParameters.id;
    const item = await itemService.getItem(itemId);
    return item
      ? { statusCode: 200, body: JSON.stringify(item) }
      : { statusCode: 404, body: JSON.stringify({ message: 'Item not found' }) };
  };