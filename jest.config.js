// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle CSS imports (if you're not using CSS Modules)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle module aliases (if you have them in tsconfig.json)
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  transform: {
    // Use SWC to compile tests
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest', {
      sourceMaps: true, // Enable source maps for better error messages
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true, // Ensure TSX is parsed
          jsx: true, // Explicitly enable JSX parsing
        },
        transform: {
          react: {
            runtime: 'automatic', // Ensure this is set
          },
        },
      },
    }],
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
