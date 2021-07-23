const {defaults} = require('jest-config')
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};