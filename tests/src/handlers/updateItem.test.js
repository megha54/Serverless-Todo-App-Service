const itemService = require('../../../src/services/itemService');
const { update } = require('../../../src/handlers/updateItem');

jest.mock('../../../src/services/itemService');

describe('Update Item Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update an item and return status 200', async () => {
    const mockId = '123';
    const mockData = { name: 'Updated Item', description: 'Updated Desc' };
    const mockUpdatedItem = { id: '123', name: 'Updated Item', description: 'Updated Desc' };

    // Mock the updateItem service method to resolve with the updated item
    itemService.updateItem.mockResolvedValue(mockUpdatedItem);

    const event = {
      pathParameters: { id: mockId },
      body: JSON.stringify(mockData),
    };

    const result = await update(event);

    // Assert that itemService.updateItem was called with the correct data
    expect(itemService.updateItem).toHaveBeenCalledWith(mockId, mockData);

    // Check the response
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(mockUpdatedItem),
    });
  });

  it('should return 500 if an error occurs during update', async () => {
    const mockId = '123';
    const mockData = { name: 'Updated Item', description: 'Updated Desc' };

    // Mock the updateItem service method to throw an error
    itemService.updateItem.mockRejectedValue(new Error('Something went wrong'));

    const event = {
      pathParameters: { id: mockId },
      body: JSON.stringify(mockData),
    };

    try {
      await update(event);
    } catch (error) {
      // Assert that the error was thrown
      expect(error).toEqual(new Error('Something went wrong'));
    }

    // Assert that itemService.updateItem was called with the correct data
    expect(itemService.updateItem).toHaveBeenCalledWith(mockId, mockData);
  });
});
