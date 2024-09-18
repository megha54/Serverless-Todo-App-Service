const itemService = require('../../../src/services/itemService');
const { get } = require('../../../src/handlers/getItem');

jest.mock('../../../src/services/itemService');

describe('Get Item Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an item with status 200 if found', async () => {
    const mockId = '123';
    const mockItem = { id: '123', name: 'Test Item', description: 'Test Desc' };

    // Mock the getItem service method to resolve with the mockItem
    itemService.getItem.mockResolvedValue(mockItem);

    const event = {
      pathParameters: { id: mockId },
    };

    const result = await get(event);

    // Assert that itemService.getItem was called with the correct id
    expect(itemService.getItem).toHaveBeenCalledWith(mockId);

    // Check the response
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(mockItem),
    });
  });

  it('should return status 404 if item is not found', async () => {
    const mockId = '123';

    // Mock the getItem service method to resolve with null
    itemService.getItem.mockResolvedValue(null);

    const event = {
      pathParameters: { id: mockId },
    };

    const result = await get(event);

    // Assert that itemService.getItem was called with the correct id
    expect(itemService.getItem).toHaveBeenCalledWith(mockId);

    // Check the response
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify({ message: 'Item not found' }),
    });
  });
});