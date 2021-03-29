const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '{clientSecret}';
const SPA_CLIENT_ID = process.env.SPA_CLIENT_ID || '{spaClientId}';
const OKTA_TESTING_DISABLEHTTPSCHECK = !!process.env.OKTA_TESTING_DISABLEHTTPSCHECK;

module.exports = {
  webServer: {
    port: 3000,
    oidc: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
      appBaseUrl: 'http://localhost:3000',
      scope: 'openid profile email',
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
      },
    },
  },
  resourceServer: {
    port: 8000,
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
