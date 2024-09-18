const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE;

module.exports.createItem = async (data) => {
  const item = {
    id: uuidv4(),
    name: data.name,
    description: data.description,
  };
  const params = {
    TableName,
    Item: item,
  };
  await dynamoDb.put(params).promise();
  return item;
};

module.exports.getItem = async (id) => {
  const params = {
    TableName,
    Key: { id },
  };
  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

module.exports.updateItem = async (id, data) => {
  const params = {
    TableName,
    Key: { id },
    UpdateExpression: 'set #name = :name, description = :description',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: { ':name': data.name, ':description': data.description },
    ReturnValues: 'UPDATED_NEW',
  };
  const result = await dynamoDb.update(params).promise();
  return result.Attributes;
};

module.exports.deleteItem = async (id) => {
  const params = {
    TableName,
    Key: { id },
  };
  await dynamoDb.delete(params).promise();
};

module.exports.listItems = async () => {
  const params = { TableName };
  const result = await dynamoDb.scan(params).promise();
  return result.Items;
};
