module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,

            modules: true,
            experimentalObjectRestSpread: true
        },
        extends: "airbnb",
        rules: {
            quotes: ["error", "single"],
            "no-nested-ternary": "off",
            "no-shadow": "off",
            "react/jsx-filename-extension": "off",
            "react/require-default-props": "off",
            "react/no-unescaped-entities": "off",
            "jsx-a11y/label-has-for": "off",
            "jsx-a11y/label-has-associated-control": "off",
            "import/no-extraneous-dependencies": "off",
            camelcase: "off"
        }
    }
};
