const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        DOMAIN: 'http://localhost:3000',
        MONGODB_USERNAME: 'ekhangati',
        MONGODB_PASSWORD: 'SMxHvXzaZ5hAQzYl',
        MONGODB_CLUSTER: 'test-field',
        MONGODB_DATABASE: 'product-feedback-app-dev',
        GOOGLE_CLIENT_ID:
          '858031658753-lir1r686jfagjqkekqknc0e9uflh7vbu.apps.googleusercontent.com',
        GOOGLE_CLIENT_SECRET: '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',
      },
    };
  }

  return {
    env: {
      DOMAIN: 'https://eric-product-feedback-app.vercel.app',
      MONGODB_USERNAME: 'ekhangati',
      MONGODB_PASSWORD: 'SMxHvXzaZ5hAQzYl',
      MONGODB_CLUSTER: 'test-field',
      MONGODB_DATABASE: 'product-feedback-app',
      GOOGLE_CLIENT_ID:
        '858031658753-lir1r686jfagjqkekqknc0e9uflh7vbu.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET: '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',
    },
  };
};
