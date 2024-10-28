export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: {
    '^chrome$': 'sinon-chrome',
  },
};
