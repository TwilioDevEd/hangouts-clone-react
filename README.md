# Google Hangouts Clone using Twilio Programmable Video and React 
This demo project demonstrates how to use Twilio APIs in a React application to
recreate a Google Hangouts app.

### Configure the sample application

Before we run the application, we'll need to gather API credentials from Google
and Twilio.

### Configure Google account information

Since part of our application uses Google oAuth for authentication we will
need configure the Google Client ID. We'll need to store this ID on the backend
and frontend since it is stored in both. In `.env`, we will configure a
`GOOGLE_CLIENT_ID` variable for the backend.

| Config Value | Description |
|--------------|-------------|
| GOOGLE_CLIENT_ID | Client ID needed for oAuth - generate one [using these instructions](https://developers.google.com/identity/sign-in/web/devconsole-project). |

We'll also configure the same ID under a different variable name in `client/.env`.

| Config Value | Description |
|--------------|-------------|
| REACT_APP_GOOGLE_CLIENT_ID | The same ID as above under a different name |

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

This demo application runs two servers simulanteously. One is a server that serves
the front-end assets of the application, the other is a server that exposes a backend
endpoint that will be used for authentication. The front-end server contains a proxy
to the backend server so that users can send a query from the frontend server
to the backend server. You can read more about this type of development
setup in [the official create-react-app documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#node).
 
So we need to install both our backend and frontend dependencies.
Let's install the dependencies for our backend first.

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

Then navigate to [http://localhost:3000/login](http://localhost:3000/login) in
order to use the application.

### Changing the application port

You can change the port that the frontend server is configured to run on by
settng the `PORT` varialbe in the `.env` file inside the `client` directory.
An example is shown in `client/.example.env`.
