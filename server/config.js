const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const TESTENV = path.resolve(__dirname, 'testenv');
if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach(k => {
    process.env[k] = envConfig[k];
  });
}

const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '{clientSecret}';
const SPA_CLIENT_ID = process.env.SPA_CLIENT_ID || '{spaClientId}';
const OKTA_TESTING_DISABLEHTTPSCHECK = !!process.env.OKTA_TESTING_DISABLEHTTPSCHECK;

module.exports = {
  webServer: {
    port: 8081,
    oidc: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
      appBaseUrl: 'http://localhost:8081',
      scope: 'openid profile email',
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
      },
    },
  },
  resourceServer: {
    port: 8001,
    oidc: {
      clientId: SPA_CLIENT_ID,
      issuer: ISSUER,
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
      },
    },
    assertClaims: {
      aud: 'api://default',
      cid: SPA_CLIENT_ID,
    },
  },
};
