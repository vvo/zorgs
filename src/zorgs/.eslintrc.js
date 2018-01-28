module.exports = {
  extends: ['../../.eslintrc.js'],
  rules: {
    'graphql/template-strings': ['error', {
      env: 'apollo',
      schemaJson: require('@gr2m/github-graphql-schema').schema.json,
    }]
  },
  plugins: [
    'graphql'
  ]
};
