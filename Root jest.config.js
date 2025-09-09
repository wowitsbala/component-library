module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/packages', '<rootDir>/apps'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};