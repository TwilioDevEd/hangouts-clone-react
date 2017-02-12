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
});

class VideoChat extends React.Component {
  render() {
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
