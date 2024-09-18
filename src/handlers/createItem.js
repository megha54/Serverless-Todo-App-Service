const itemService = require('../services/itemService');
// Delete an Create
module.exports.create = async (event) => {
    const data = JSON.parse(event.body);
    const item = await itemService.createItem(data);
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  };