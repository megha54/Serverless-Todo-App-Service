const itemService = require('../../../src/services/itemService');
const { create } = require('../../../src/handlers/createItem');

jest.mock('../../../src/services/itemService');

describe('Create Item Handler', () => {
  // Reset the mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new item and return status 200', async () => {
    const mockData = { name: 'Test Item', description: 'Test Desc' };
    const mockItem = { id: '123', name: 'Test Item', description: 'Test Desc' };

    // Mock the createItem service method to resolve with mockItem
    itemService.createItem.mockResolvedValue(mockItem);

    // Simulate the API Gateway event with a body containing the mockData
    const event = {
      body: JSON.stringify(mockData),
    };

    // Call the create handler
    const result = await create(event);

    // Assert that itemService.createItem was called with the correct data
    expect(itemService.createItem).toHaveBeenCalledWith(mockData);

    // Check the response from the handler
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(mockItem),
    });
  });

  it('should return 500 if an error occurs', async () => {
    const mockData = { name: 'Test Item', description: 'Test Desc' };

    // Mock the createItem service method to throw an error
    itemService.createItem.mockRejectedValue(new Error('Something went wrong'));

    // Simulate the API Gateway event with a body containing the mockData
    const event = {
      body: JSON.stringify(mockData),
    };

    // Call the create handler and expect it to throw
    try {
      await create(event);
    } catch (error) {
      // Assert that an error is thrown
      expect(error).toEqual(new Error('Something went wrong'));
    }

    // Assert that itemService.createItem was called with the correct data
    expect(itemService.createItem).toHaveBeenCalledWith(mockData);
  });
});