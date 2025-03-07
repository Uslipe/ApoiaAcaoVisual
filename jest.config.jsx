module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["<rootDir>/src/**/*.test.jsx"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.jsx"],
};
