module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost:80/hw/store/",
  },
  testMatch: ["<rootDir>/test/unit/*.test.tsx"],
};
