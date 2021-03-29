/* eslint-disable import/no-dynamic-require */
require('./env');

const E2E_DIR = '../okta-oidc-tck/e2e-tests/okta-hosted-login/';
const { config } = require(`${E2E_DIR}conf.js`);
config.specs = config.specs.map(path => E2E_DIR + path);

['CLIENT_ID', 'ISSUER', 'USERNAME', 'PASSWORD'].forEach(key => {
  // console.log(`ENVIRONMENT VAR "${key}"`, process.env[key]);
  if (!process.env[key]) {
    throw new Error(`Environment variable "${key}" is not set`);
  }
});

exports.config = config;
