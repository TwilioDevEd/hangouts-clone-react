import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import GoogleLogin from 'react-google-login';

import {
  GOOGLE_CLIENT_ID,
} from '../env';

import {
  setUserToken,
  setUserId,
  setUserName,
} from '../actions';

const styles = StyleSheet.create({
  content: {
    fontFamily: 'Roboto',
    color: '#fff',
    textAlign: 'left',
    textShadown: '0 2px 4px rgba(0,0,0,0.5)',
    fontWeight: '300',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
});

class Login extends React.Component {
  constructor() {
    super();
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onSuccess(response) {
    console.log(response);
    const tokenId = response.tokenId;
    const googleId = response.profileObj.googleId;
    fetch('/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        tokenId: tokenId,
        googleId: googleId,
      })
    }).then((response) => {
      console.log(response);
    });
  }

  onFailure(response) {
    alert('Oops! There was an error while logging you in!');
  }

  render() {
    return (
      <div className={css(styles.content)}>
        <h1>Hi, there!</h1>
        <h2>Get started by logging in with your Google Account.</h2>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export const mapStateToProps = (state) => ({
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
  postSuccess: (token, id, username) => {
    console.log('dispatching actions');
    dispatch(setUserToken(token));
    dispatch(setUserId(id));
    dispatch(setUserName(username));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
