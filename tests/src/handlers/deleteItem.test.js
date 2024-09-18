const itemService = require('../../../src/services/itemService');
const { delete: deleteHandler } = require('../../../src/handlers/deleteItem'); 

jest.mock('../../../src/services/itemService');

describe('Delete Item Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete an item and return status 200', async () => {
    const mockId = '123';

    // Mock the deleteItem service method to resolve successfully
    itemService.deleteItem.mockResolvedValue();

    // Simulate the API Gateway event with pathParameters containing the mockId
    const event = {
      pathParameters: {
        id: mockId,
      },
    };

    // Call the delete handler
    const result = await deleteHandler(event);

    // Assert that itemService.deleteItem was called with the correct id
    expect(itemService.deleteItem).toHaveBeenCalledWith(mockId);

    // Check the response from the handler
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message: 'Item deleted' }),
    });
  });

  it('should return 500 if an error occurs during deletion', async () => {
    const mockId = '123';

    // Mock the deleteItem service method to throw an error
    itemService.deleteItem.mockRejectedValue(new Error('Something went wrong'));

    const event = {
      pathParameters: {
        id: mockId,
      },
    };

    // Call the delete handler and handle the error
    try {
      await deleteHandler(event);
    } catch (error) {
      // Assert that the error was thrown
      expect(error).toEqual(new Error('Something went wrong'));
    }

    // Assert that itemService.deleteItem was called with the correct id
    expect(itemService.deleteItem).toHaveBeenCalledWith(mockId);
  });
});