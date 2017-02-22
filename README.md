# Google Hangouts Clone using Twilio Programmable Video and React 
This demo project demonstrates how to use Twilio APIs in a React application to
recreate a Google Hangouts app.

### Configure the sample application

Before we run the application, we'll need to gather API credentials from Google
and Twilio.

### Configure Google account information

| Config Value | Description |
|--------------|-------------|
| GOOGLE_CLIENT_ID | Client ID needed for oAuth - generate one [using these instructions](https://developers.google.com/identity/sign-in/web/devconsole-project). |

### Configure Twilio account information

| Config Value | Description |
|--------------|-------------|
| TWILIO_ACCOUNT_SID | Your primary Twilio account identifier - find this [in the console here](https://www.twilio.com/console). |
| TWILIO_API_KEY | Used to authenticate - [generate one here](https://www.twilio.com/console/video/dev-tools/api-keys). |
| TWILIO_API_SECRET | Used to authenticate - generated when you generate the key above. |

### Configure Twilio video settings

| Config Value | Description |
|--------------|-------------|
| TWILIO_CONFIGURATION_SID | Identifier for a set of config properties for your video application - [find yours here](https://www.twilio.com/console/video/profiles). |

## Run the demo application
 
Now that the application is configured, we need to install both our backend
and frontend dependencies. We'll install the dependencies for our backend
application.

```
npm install
```

We'll then install our frontend dependencies.

```
cd client
npm install
```

Then we'll need to initiate both the backend and frontend servers.

```
cd ..
npm start
```

Then navigae to [http://localhost:3000/login](http://localhost:3000/login) in
order to use the application.

### Changing the application port

You can change the port that the frontend server is configured to run on by
settng the `PORT` varialbe in the `.env` file inside the `client` directory.
An example is shown in `client/.example.env`.
