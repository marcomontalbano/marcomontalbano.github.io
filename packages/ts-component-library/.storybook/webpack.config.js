const path = require('path');

module.exports = ({config}) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [
            path.join(__dirname, '../src'),
            path.join(__dirname, '../stories') // dont need stories path if you have your stories inside your //components folder
        ],
        use: [
            {
                loader: require.resolve('awesome-typescript-loader'),
                options: {
                    configFileName: './.storybook/tsconfig.json'
                }
            },
            { loader: require.resolve('react-docgen-typescript-loader') }
        ]
    });

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
