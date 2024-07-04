module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts', '!src/setup/**/*.ts', '!src/slack/*.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/build', '/dist', '/coverage'],
};
