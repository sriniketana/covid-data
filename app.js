const app = require('express')()
const data = require('./file.json')
  var passport = require('passport-mfp-token-validation').Passport;
  var mfpStrategy = require('passport-mfp-token-validation').Strategy;

  passport.use(new mfpStrategy({
    authServerUrl: 'https://mobilefoundation.icpademo-c33bf0f22ab59313b3628c493e016b88-0000.us-south.containers.appdomain.cloud/mfp/api',
    confClientID: 'testclient',
    confClientPass: 'testclient',
    analytics: {
        onpremise: {
            url: 'https://mobilefoundation.icpademo-c33bf0f22ab59313b3628c493e016b88-0000.us-south.containers.appdomain.cloud/analytics-service/rest/v3',
            username: 'admin',
            password: 'admin'
        }
    }
  }));

  app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send("Hello from Appsody!");
});
 
app.get('/getPatients', passport.authenticate('mobilefirst-strategy', {
  session: false,
  scope: 'accessRestricted'
}), (req, res, next ) => {
res.send('Covid cases'  + JSON.stringify(data) );
// Changes to source code
});

module.exports.app = app;
