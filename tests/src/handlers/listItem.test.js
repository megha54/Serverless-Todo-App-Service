const itemService = require('../../../src/services/itemService');
const { list } = require('../../../src/handlers/listItems'); 

jest.mock('../../../src/services/itemService');

describe('List Items Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all items with status 200', async () => {
    const mockItems = [
      { id: '1', name: 'Item 1', description: 'Desc 1' },
      { id: '2', name: 'Item 2', description: 'Desc 2' },
    ];

    // Mock the listItems service method to resolve with the mockItems
    itemService.listItems.mockResolvedValue(mockItems);

    const result = await list();

    // Assert that itemService.listItems was called
    expect(itemService.listItems).toHaveBeenCalled();

    // Check the response
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(mockItems),
    });
  });

  it('should return an empty array if no items are found', async () => {
    const mockItems = [];

    // Mock the listItems service method to resolve with an empty array
    itemService.listItems.mockResolvedValue(mockItems);

    const result = await list();

    // Assert that itemService.listItems was called
    expect(itemService.listItems).toHaveBeenCalled();

    // Check the response
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(mockItems),
    });
  });
});
