import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import VideoCamOff from 'material-ui/svg-icons/av/videocam-off';
import CallEnd from 'material-ui/svg-icons/communication/call-end';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: '20px',
    display: 'inline-block',
    marginTop: '20px',
  },
  warning: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: '30px',
    fontFamily: 'Roboto',
    color: 'red',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
});

class VideoChat extends React.Component {
  render() {
    if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
      return (
        <div className={css(styles.warning)}>
          <h1>Oops! WebRTC is not available in your browser.</h1>
        </div>
      );
    }
    return (
      <div className={css(styles.toolbar)}>
        <MicOff color='white'/>
        <VideoCamOff color='white'/>
        <CallEnd color='red'/>
      </div>
    );
  }
}

export default VideoChat;
