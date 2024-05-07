const esModules = [
    "query-string",
    "decode-uri-component",
    "split-on-first",
    "filter-obj",
];

module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    transformIgnorePatterns: esModules.length
    ? [`/node_modules/(?!${esModules.join("|")})`]
    : [],
}