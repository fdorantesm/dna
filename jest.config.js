module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: true,
    },
    NODE_ENV: 'test',
  },
  moduleNameMapper: {
    '^src/(.+)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  preset: 'ts-jest/presets/js-with-ts',
};
