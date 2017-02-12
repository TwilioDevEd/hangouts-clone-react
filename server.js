require('dotenv').load();

const GoogleAuth = require('google-auth-library');
const authentication = new GoogleAuth();
const client = new authentication.OAuth2(process.env.GOOGLE_CLIENT_ID);

const AccessToken = require('twilio').AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/token', (request, response) => {
  const body = request.body;

  // Validate Goolge ID token sent from front-end 
  client.verifyIdToken(body.tokenId, process.env.GOOGLE_CLIENT_ID, (e, login) => {
    const payload = login.getPayload();
    const userId = payload.sub;
    if (userId === body.googleId) {
      const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
      );

      token.identity = body.googleId;

      const grant = new VideoGrant();
      grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
      token.addGrant(grant);
      
      response.send({
        identity: body.googleId,
        token: token.toJwt(),
      });
    } else {
      response.status(500);
      response.send({
        error: 'Authentication was unsuccessful!',
      });
    }
  });
});

app.get('*', (request, response) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(3001, () => {
  console.log("App listening on port 3001");
});
