export default {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|js|mjs|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'jsx', 'json', 'node']
};
