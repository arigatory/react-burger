export {};

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|jsx|ts|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov'],
  transformIgnorePatterns: ['node_modules/'],
};
