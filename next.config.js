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
        NEXT_PUBLIC_SECRET: 'bda381e506c4b341c2c12ec44f87d17f',
        NEXTAUTH_URL: 'http://localhost:3000',
      },
    };
  }

  return {
    env: {
      DOMAIN: 'https://eric-product-feedback-app.vercel.app',
      MONGODB_USERNAME: 'ekhangati',
      MONGODB_PASSWORD: 'SMxHvXzaZ5hAQzYl',
      MONGODB_CLUSTER: 'test-field',
      MONGODB_DATABASE: 'product-feedback-app-dev',
      GOOGLE_CLIENT_ID:
        '858031658753-lir1r686jfagjqkekqknc0e9uflh7vbu.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET: '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',
      NEXT_PUBLIC_SECRET: 'bda381e506c4b341c2c12ec44f87d17f',
      NEXTAUTH_URL: 'https://eric-product-feedback-app.vercel.app',
    },
  };
};
