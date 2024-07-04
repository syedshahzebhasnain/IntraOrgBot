describe('loadConfig', () => {
  beforeEach(() => {
    jest.resetModules(); // Reset modules before each test
    jest.mock('dotenv', () => ({
      config: jest.fn(),
    }));
    jest.mock('path', () => ({
      join: jest.fn(() => './local.json'), // Mock join to return a fixed path
    }));
  });

  it('loads default configuration when no environment variable is set', () => {
    jest.isolateModules(() => {
      const mockConfig = {key: 'value'};
      jest.doMock('../../src/config/local.json', () => mockConfig, {
        virtual: true,
      });
      const loadConfig = require('../../src/config/load').default;
      const config = loadConfig();
      expect(config).toEqual(mockConfig);
    });
  });
});
