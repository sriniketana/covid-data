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
 
/* Every code needs good commenting practices *
* This endpoint returns the number of active COVID-19 cases 
*/
app.get('/getPatients', passport.authenticate('mobilefirst-strategy', {
  session: false,
  scope: 'accessRestricted'
}), (req, res, next ) => {
res.send('Covid cases'  + JSON.stringify(data) );
});

module.exports.app = app;
