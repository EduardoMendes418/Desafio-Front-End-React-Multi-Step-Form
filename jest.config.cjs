module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  testMatch: ["**/__tests__/**/*.(ts|tsx)", "**/?(*.)+(spec|test).(ts|tsx)"],
  transformIgnorePatterns: ["node_modules/(?!(react|react-dom)/)"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/store/",
    "<rootDir>/src/utils/",
    "<rootDir>/src/hooks/",
    "<rootDir>/src/schemas/",
    "<rootDir>/src/components/ui/",
    "<rootDir>/src/constants/",
    "<rootDir>/src/services/",
  ],
};
