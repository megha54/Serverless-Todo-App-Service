const AWS = require('aws-sdk');
const itemService = require('../../../src/services/itemService');


// Mock the AWS SDK and DynamoDB DocumentClient
jest.mock('aws-sdk', () => {
  const mockDocumentClient = {
    put: jest.fn().mockReturnValue({ promise: jest.fn() }),
    get: jest.fn().mockReturnValue({ promise: jest.fn() }),
    update: jest.fn().mockReturnValue({ promise: jest.fn() }),
    delete: jest.fn().mockReturnValue({ promise: jest.fn() }),
    scan: jest.fn().mockReturnValue({ promise: jest.fn() })
  };

  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => mockDocumentClient)
    }
  };
});

describe('Item Service', () => {
  let mockPutPromise, mockGetPromise, mockUpdatePromise, mockDeletePromise, mockScanPromise;
  
  beforeEach(() => {
    jest.clearAllMocks();

    // Set the environment variable for the DynamoDB table
    process.env.DYNAMODB_TABLE = 'todo-ddb';

    // Mock each DynamoDB operation's promise
    mockPutPromise = AWS.DynamoDB.DocumentClient().put().promise;
    mockGetPromise = AWS.DynamoDB.DocumentClient().get().promise;
    mockUpdatePromise = AWS.DynamoDB.DocumentClient().update().promise;
    mockDeletePromise = AWS.DynamoDB.DocumentClient().delete().promise;
    mockScanPromise = AWS.DynamoDB.DocumentClient().scan().promise;
  });

  // Test: Create Item
  it('should create a new item', async () => {
    const data = { name: 'Test Item', description: 'Test Desc' };

    // Mock the resolved value of the DynamoDB put operation
    mockPutPromise.mockResolvedValue({});

    const result = await itemService.createItem(data);

    expect(result).toHaveProperty('id');
    expect(result).toMatchObject({ name: 'Test Item', description: 'Test Desc' });

  });

  // Test: Get Item by ID
  it('should get an item by id', async () => {
    const mockItem = { id: '123', name: 'Test Item', description: 'Test Desc' };

    // Mock the DynamoDB get operation
    mockGetPromise.mockResolvedValue({ Item: mockItem });

    const result = await itemService.getItem('123');

    expect(result).toEqual(mockItem);

  });



  // Test: Update Item
  it('should update an existing item', async () => {
    const updatedAttributes = { name: 'Updated Item', description: 'Updated Desc' };

    // Mock the DynamoDB update operation
    mockUpdatePromise.mockResolvedValue({ Attributes: updatedAttributes });

    const result = await itemService.updateItem('123', updatedAttributes);

    expect(result).toEqual(updatedAttributes);
    
  });

  // Test: Delete Item
  it('should delete an item by id', async () => {
    // Mock the DynamoDB delete operation
    mockDeletePromise.mockResolvedValue({});

    await itemService.deleteItem('123');

    
  });

  // Test: List All Items
  it('should list all items', async () => {
    const mockItems = [
      { id: '1', name: 'Item 1', description: 'Desc 1' },
      { id: '2', name: 'Item 2', description: 'Desc 2' },
    ];

    // Mock the DynamoDB scan operation
    mockScanPromise.mockResolvedValue({ Items: mockItems });

    const result = await itemService.listItems();

    expect(result).toEqual(mockItems);
    
  });
});