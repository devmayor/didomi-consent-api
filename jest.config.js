module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/test/**/*spec.ts'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverage: true,
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1"
    },
    globals: {
      'ts-jest': {
        diagnostics: {
          ignoreCodes: ['TS151001'],
        },
        tsconfig: '<rootDir>/tsconfig.json',
      },
    },
  };