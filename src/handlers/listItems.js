const itemService = require('../services/itemService');
// List all items
module.exports.list = async () => {
    const items = await itemService.listItems();
    return { statusCode: 200, body: JSON.stringify(items) };
  };