module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '^src/(.+)$': '<rootDir>/src/$1',
    '^@plugins/mongoose-hide-object-id(|/.*)$':
      '<rootDir>/libs/mongoose-hide-object-id/src/$1',
  },
};
