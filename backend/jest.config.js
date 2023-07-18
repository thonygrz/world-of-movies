module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testMatch: ['**/*.spec.js', '**/*.test.js'],
};