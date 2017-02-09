import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import VideoCall from 'material-ui/svg-icons/av/video-call';

import {
  setRoomId,
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
  }
});

class Main extends React.Component {
  render() {
    return (
      <div className={css(styles.content)}>
        <h1>Let's get started!</h1>
        <h2>Click the button below to create a new video chat room!</h2>
        <div onClick={this.props.createRoom}>
          <VideoCall
            style={{
              border: 'white 2px solid',
              borderRadius: '100%',
              padding: '25px'
            }}
            color='white'
          />
          <p>VIDEO CALL</p>
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  createRoom: (id) => {
    dispatch(setRoomId(id));
  }
});

export default connect(null, mapDispatchToProps)(Main);
